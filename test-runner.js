#!/usr/bin/env node

/**
 * SevaDaan Platform - Comprehensive Route and API Testing
 * This script tests all the problematic routes and documents the results
 */

const axios = require('axios');

const API_BASE = 'http://localhost:3000/api/v1';
const FRONTEND_BASE = 'http://localhost:5174';

// Test results storage
const testResults = {
  apiTests: [],
  frontendTests: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0
  }
};

// Helper function to make API requests
async function testAPI(endpoint, description) {
  try {
    console.log(`Testing API: ${endpoint}`);
    const response = await axios.get(`${API_BASE}${endpoint}`, { timeout: 10000 });
    
    const result = {
      endpoint,
      description,
      status: response.status,
      success: response.status === 200,
      dataLength: response.data.data ? response.data.data.length : 0,
      responseTime: Date.now()
    };
    
    testResults.apiTests.push(result);
    testResults.summary.total++;
    
    if (result.success) {
      testResults.summary.passed++;
      console.log(`✅ ${description} - OK (${result.dataLength} items)`);
    } else {
      testResults.summary.failed++;
      console.log(`❌ ${description} - FAILED`);
    }
    
    return result;
  } catch (error) {
    const result = {
      endpoint,
      description,
      status: error.response?.status || 0,
      success: false,
      error: error.message,
      dataLength: 0
    };
    
    testResults.apiTests.push(result);
    testResults.summary.total++;
    testResults.summary.failed++;
    
    console.log(`❌ ${description} - ERROR: ${error.message}`);
    return result;
  }
}

// Helper function to test frontend routes
async function testFrontend(route, description) {
  try {
    console.log(`Testing Frontend: ${route}`);
    const response = await axios.get(`${FRONTEND_BASE}${route}`, { timeout: 10000 });
    
    const result = {
      route,
      description,
      status: response.status,
      success: response.status === 200,
      contentLength: response.data.length
    };
    
    testResults.frontendTests.push(result);
    testResults.summary.total++;
    
    if (result.success) {
      testResults.summary.passed++;
      console.log(`✅ ${description} - Route loads successfully`);
    } else {
      testResults.summary.failed++;
      console.log(`❌ ${description} - FAILED`);
    }
    
    return result;
  } catch (error) {
    const result = {
      route,
      description,
      status: error.response?.status || 0,
      success: false,
      error: error.message,
      contentLength: 0
    };
    
    testResults.frontendTests.push(result);
    testResults.summary.total++;
    testResults.summary.failed++;
    
    console.log(`❌ ${description} - ERROR: ${error.message}`);
    return result;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting SevaDaan Platform Route and API Tests');
  console.log('=' .repeat(60));
  
  try {
    // Test API Health
    console.log('\n📡 Testing Backend Health...');
    await testAPI('/../../health', 'Backend Health Check');
    
    // Test Core API Endpoints
    console.log('\n📡 Testing Core API Endpoints...');
    await testAPI('/ngos', 'NGOs List API');
    await testAPI('/programs', 'Programs List API');
    await testAPI('/volunteer-opportunities/opportunities', 'Volunteer Opportunities API');
    
    // Test API with Parameters
    console.log('\n📡 Testing API with Parameters...');
    await testAPI('/ngos?limit=5', 'NGOs with Limit Parameter');
    await testAPI('/programs?limit=3', 'Programs with Limit Parameter');
    await testAPI('/volunteer-opportunities/opportunities?limit=2', 'Volunteer Opportunities with Limit');
    
    // Test Additional APIs
    console.log('\n📡 Testing Additional APIs...');
    await testAPI('/testimonials', 'Testimonials API');
    
    // Wait a moment for servers to be ready
    console.log('\n🌐 Testing Frontend Routes...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test Frontend Routes
    await testFrontend('/', 'Home Page');
    await testFrontend('/ngos', 'NGOs Page');
    await testFrontend('/programs', 'Programs Page');
    await testFrontend('/volunteer', 'Volunteer Page');
    await testFrontend('/emergency-help', 'Emergency Help Page');
    
  } catch (error) {
    console.log(`🚨 Critical error during testing: ${error.message}`);
  }
  
  // Generate Test Report
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('=' .repeat(60));
  
  console.log(`Total Tests: ${testResults.summary.total}`);
  console.log(`Passed: ${testResults.summary.passed}`);
  console.log(`Failed: ${testResults.summary.failed}`);
  console.log(`Success Rate: ${((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}%`);
  
  // Detailed API Results
  console.log('\n🔧 API Test Details:');
  testResults.apiTests.forEach(test => {
    const status = test.success ? 'PASS' : 'FAIL';
    console.log(`  ${status} ${test.endpoint} - ${test.description}`);
    if (test.dataLength > 0) {
      console.log(`    └─ Data items: ${test.dataLength}`);
    }
    if (test.error) {
      console.log(`    └─ Error: ${test.error}`);
    }
  });
  
  // Detailed Frontend Results
  console.log('\n🌐 Frontend Test Details:');
  testResults.frontendTests.forEach(test => {
    const status = test.success ? 'PASS' : 'FAIL';
    console.log(`  ${status} ${test.route} - ${test.description}`);
    if (test.error) {
      console.log(`    └─ Error: ${test.error}`);
    }
  });
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  
  const failedAPI = testResults.apiTests.filter(t => !t.success);
  const failedFrontend = testResults.frontendTests.filter(t => !t.success);
  
  if (failedAPI.length === 0 && failedFrontend.length === 0) {
    console.log('✅ All tests passed! The platform is working correctly.');
  } else {
    if (failedAPI.length > 0) {
      console.log('🔧 Backend issues found:');
      failedAPI.forEach(test => {
        console.log(`  - Fix ${test.endpoint}: ${test.error || 'Status ' + test.status}`);
      });
    }
    
    if (failedFrontend.length > 0) {
      console.log('🌐 Frontend issues found:');
      failedFrontend.forEach(test => {
        console.log(`  - Fix ${test.route}: ${test.error || 'Status ' + test.status}`);
      });
    }
  }
  
  // Save results to file
  const fs = require('fs');
  const reportPath = './test-results.json';
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  console.log(`\n📄 Detailed results saved to: ${reportPath}`);
  
  console.log('\n' + '=' .repeat(60));
  console.log('🎯 Test Complete!');
  console.log('=' .repeat(60));
}

// Check if required dependencies are available
async function checkDependencies() {
  try {
    // Check if servers are running
    await axios.get('http://localhost:3000/health', { timeout: 5000 });
    console.log('✅ Backend server is running');
  } catch (error) {
    console.log('❌ Backend server is not running on port 3000');
    console.log('Please start the backend server first: npm start');
    process.exit(1);
  }
  
  try {
    await axios.get('http://localhost:5174/', { timeout: 5000 });
    console.log('✅ Frontend server is running');
  } catch (error) {
    console.log('❌ Frontend server is not running on port 5174');
    console.log('Please start the frontend server first: npm run dev');
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  checkDependencies()
    .then(() => runTests())
    .catch(error => {
      console.error('Failed to run tests:', error.message);
      process.exit(1);
    });
}

module.exports = { runTests, testAPI, testFrontend };
