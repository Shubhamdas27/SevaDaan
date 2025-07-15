import React from 'react';
import { Icons } from '../components/icons';
import Layout from '../components/common/Layout';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const About: React.FC = () => {
  const timeline = [
    {
      year: '2022',
      title: 'Platform Launch',
      description: 'SevaDaan was launched with the mission to connect NGOs with donors and volunteers.',
    },
    {
      year: '2023',
      title: 'Expanded Reach',
      description: 'Reached 100+ NGOs and facilitated over ₹1 crore in donations.',
    },
    {
      year: '2024',
      title: 'New Features',
      description: 'Introduced grant management and volunteer coordination systems.',
    },
    {
      year: '2025',
      title: 'Future Goals',
      description: 'Aiming to reach 1000+ NGOs and expand to international markets.',
    },
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    },
    {
      name: 'Rahul Mehta',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    },
    {
      name: 'Anita Desai',
      role: 'Head of NGO Relations',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    },
    {
      name: 'Vikram Singh',
      role: 'Community Manager',
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    },
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 py-16 text-white">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About SevaDaan</h1>
          <p className="text-white/90 max-w-3xl">
            Empowering NGOs and connecting them with donors and volunteers to create meaningful social impact across India.
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg text-slate-600 mb-8">
            SevaDaan is dedicated to bridging the gap between NGOs, donors, and volunteers. We believe in creating a transparent and efficient platform that enables meaningful social impact and sustainable development across India.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icons.target className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium mb-2">Vision</h3>
                    <p className="text-slate-600">
                      To become India's most trusted platform for social impact, facilitating seamless collaboration between NGOs and supporters.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icons.favorite className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium mb-2">Values</h3>
                    <p className="text-slate-600">
                      Transparency, accountability, and dedication to creating positive social change in communities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">150+</div>
                <div className="text-slate-600">NGOs Registered</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">₹1.5Cr+</div>
                <div className="text-slate-600">Donations Facilitated</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
                <div className="text-slate-600">Volunteers Connected</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">25+</div>
                <div className="text-slate-600">States Covered</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-slate-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Our Journey</h2>
          <div className="space-y-6">
            {timeline.map((item) => (
              <Card key={item.year}>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24">
                      <div className="text-xl font-bold text-primary-600">{item.year}</div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Mission</h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Whether you're an NGO looking to expand your reach, a donor wanting to make a difference, or a volunteer ready to contribute, we welcome you to join our platform.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" rightIcon={<Icons.arrowRight className="w-4 h-4" />}>
              Register Now
            </Button>
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;