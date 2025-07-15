import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Icons } from '../components/icons';
import api from '../lib/api';

interface NGOPageData {
  ngo: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    mission: string;
    vision: string;
    logo: string;
    images: string[];
    address: {
      city: string;
      state: string;
      street: string;
    };
    website: string;
    email: string;
    phone: string;
    status: string;
    verificationDate: string;
    categories: string[];
    achievements: string[];
    socialMedia: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
    stats: {
      totalDonations: number;
      totalVolunteers: number;
      totalBeneficiaries: number;
      activePrograms: number;
    };
  };
  activePrograms: Array<{
    _id: string;
    title: string;
    description: string;
    shortDescription: string;
    targetAmount: number;
    raisedAmount: number;
    volunteersNeeded: number;
    volunteersRegistered: number;
    startDate: string;
    endDate: string;
    category: string;
    status: string;
    featured: boolean;
    images: string[];
  }>;
}

const NGOPublicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<NGOPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNGOData();
  }, [slug]);

  const fetchNGOData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/ngos/public/${slug}`);
      setData(response.data.data);
    } catch (error: any) {
      console.error('Error fetching NGO data:', error);
      setError(error.response?.data?.message || 'Failed to load NGO information');
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = (programId: string) => {
    navigate(`/donate/${programId}`);
  };

  const handleVolunteer = (programId: string) => {
    navigate(`/volunteer/apply/${programId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icons.error className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">NGO Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The NGO you are looking for does not exist.'}</p>
          <Button onClick={() => navigate('/ngos')}>Browse All NGOs</Button>
        </div>
      </div>
    );
  }

  const { ngo, activePrograms } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* NGO Logo */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-white rounded-full p-4 shadow-lg">
                  {ngo.logo ? (
                    <img 
                      src={ngo.logo} 
                      alt={`${ngo.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                      <Icons.favorite className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* NGO Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold">{ngo.name}</h1>
                  {ngo.status === 'verified' && (
                    <Badge variant="success" className="bg-green-500 text-white">
                      <Icons.success className="w-4 h-4 mr-1" />
                      Verified NGO
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100 mb-4">
                  <Icons.location className="w-5 h-5" />
                  <span>{ngo.address.city}, {ngo.address.state}</span>
                </div>

                <p className="text-lg text-blue-100 mb-6">{ngo.description}</p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => activePrograms.length > 0 && handleDonate(activePrograms[0]._id)}
                  >
                    <Icons.favorite className="w-5 h-5 mr-2" />
                    Donate Now
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                    onClick={() => activePrograms.length > 0 && handleVolunteer(activePrograms[0]._id)}
                  >
                    <Icons.users className="w-5 h-5 mr-2" />
                    Volunteer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-gray-50" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M0,0V60c0,0,200,40,600,40s600-40,600-40V0Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icons.dollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(ngo.stats.totalDonations)}</div>
              <div className="text-gray-600">Total Donations</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icons.users className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{ngo.stats.totalVolunteers}</div>
              <div className="text-gray-600">Volunteers</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icons.favorite className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{ngo.stats.totalBeneficiaries.toLocaleString()}</div>
              <div className="text-gray-600">Beneficiaries</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icons.calendar className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{ngo.stats.activePrograms}</div>
              <div className="text-gray-600">Active Programs</div>
            </div>
          </div>

          {/* Active Programs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Active Programs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activePrograms.map((program) => (
                <Card key={program._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {program.images.length > 0 && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={program.images[0]} 
                        alt={program.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-program.jpg';
                        }}
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="primary">{program.category}</Badge>
                      {program.featured && (
                        <Badge variant="primary">Featured</Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">{program.shortDescription}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Raised: {formatCurrency(program.raisedAmount)}</span>
                        <span>Goal: {formatCurrency(program.targetAmount)}</span>
                      </div>
                      <Progress 
                        value={program.raisedAmount} 
                        max={program.targetAmount} 
                        color="success"
                        className="mb-1"
                      />
                      <div className="text-sm text-gray-600 mt-1">
                        {getProgressPercentage(program.raisedAmount, program.targetAmount).toFixed(1)}% funded
                      </div>
                    </div>

                    {/* Volunteer Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Volunteers: {program.volunteersRegistered}/{program.volunteersNeeded}</span>
                        <span>{program.volunteersNeeded - program.volunteersRegistered} spots left</span>
                      </div>
                      <Progress 
                        value={program.volunteersRegistered} 
                        max={program.volunteersNeeded} 
                        color="primary"
                        className="mb-1"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-orange-500 hover:bg-orange-600"
                        onClick={() => handleDonate(program._id)}
                      >
                        <Icons.favorite className="w-4 h-4 mr-2" />
                        Donate
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleVolunteer(program._id)}
                        disabled={program.volunteersRegistered >= program.volunteersNeeded}
                      >
                        <Icons.users className="w-4 h-4 mr-2" />
                        {program.volunteersRegistered >= program.volunteersNeeded ? 'Full' : 'Volunteer'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{ngo.mission}</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{ngo.vision}</p>
              </div>
            </div>
          </section>

          {/* Achievements */}
          {ngo.achievements.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Achievements</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {ngo.achievements.map((achievement, index) => (
                  <Card key={index} className="text-center p-6">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icons.award className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{achievement}</h3>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Contact Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icons.location className="w-5 h-5 text-gray-500" />
                    <span>{ngo.address.street}, {ngo.address.city}, {ngo.address.state}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.phone className="w-5 h-5 text-gray-500" />
                    <span>{ngo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.email className="w-5 h-5 text-gray-500" />
                    <span>{ngo.email}</span>
                  </div>
                  {ngo.website && (
                    <div className="flex items-center gap-3">
                      <Icons.externalLink className="w-5 h-5 text-gray-500" />
                      <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {ngo.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {ngo.socialMedia.facebook && (
                    <a href={ngo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" 
                       title="Follow us on Facebook"
                       aria-label="Follow us on Facebook"
                       className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                      <Icons.facebook className="w-5 h-5" />
                    </a>
                  )}
                  {ngo.socialMedia.twitter && (
                    <a href={ngo.socialMedia.twitter} target="_blank" rel="noopener noreferrer"
                       title="Follow us on Twitter"
                       aria-label="Follow us on Twitter"
                       className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors">
                      <Icons.twitter className="w-5 h-5" />
                    </a>
                  )}
                  {ngo.socialMedia.instagram && (
                    <a href={ngo.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
                       title="Follow us on Instagram"
                       aria-label="Follow us on Instagram"
                       className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
                      <Icons.instagram className="w-5 h-5" />
                    </a>
                  )}
                  {ngo.socialMedia.linkedin && (
                    <a href={ngo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer"
                       title="Follow us on LinkedIn"
                       aria-label="Follow us on LinkedIn"
                       className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors">
                      <Icons.linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NGOPublicPage;
