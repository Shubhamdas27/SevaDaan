import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { NoticeBoard } from '../ui/NoticeBoard';
import { ProgressBar } from '../ui/ProgressBar';
import { Icons } from '../icons';
import { NGO, Program, Testimonial, MediaItem, Notice } from '../../types';
import { formatDate, truncateText } from '../../utils/formatters';

interface NGOProfileProps {
  ngo: NGO;
  programs: Program[];
  testimonials: Testimonial[];
  mediaItems: MediaItem[];
  notices: Notice[];
}

const NGOProfile: React.FC<NGOProfileProps> = ({ 
  ngo, 
  programs, 
  testimonials, 
  mediaItems, 
  notices 
}) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const handlePrevMedia = () => {
    setActiveMediaIndex((prevIndex) => 
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  };

  const handleNextMedia = () => {
    setActiveMediaIndex((prevIndex) => 
      (prevIndex + 1) % mediaItems.length
    );
  };

  const activeMedia = mediaItems[activeMediaIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Hero Section with Animated Background */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-[30%] left-[80%] w-2 h-2 bg-white rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-[60%] left-[10%] w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-[80%] left-[70%] w-2 h-2 bg-white rounded-full animate-pulse delay-1500"></div>
          <div className="absolute top-[20%] left-[60%] w-2 h-2 bg-white rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-[70%] left-[40%] w-2 h-2 bg-white rounded-full animate-pulse delay-2500"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Enhanced NGO Logo with Glow Effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              <div className="relative w-48 h-48 rounded-full overflow-hidden bg-white p-6 shadow-2xl ring-8 ring-white/30 group-hover:ring-white/50 transition-all duration-500 transform group-hover:scale-105">
                <img 
                  src={ngo.logo} 
                  alt={ngo.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Enhanced Verification Badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white p-3 rounded-full shadow-lg ring-4 ring-white/30 animate-bounce">
                <Icons.success className="w-6 h-6" />
              </div>
            </div>
            
            {/* Enhanced NGO Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm text-green-300 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-green-400/30">
                <Icons.success className="w-5 h-5 mr-2" />
                <span className="text-base">✓ Verified NGO</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  {ngo.name}
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="flex items-center text-white/90 bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Icons.location className="w-5 h-5 mr-3 text-blue-300" />
                  <span className="font-medium">{ngo.city}, {ngo.state}</span>
                </div>
                
                <div className="flex items-center text-white/90 bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Icons.users className="w-5 h-5 mr-3 text-purple-300" />
                  <span className="font-medium">Since {new Date().getFullYear() - 5}</span>
                </div>
                
                {ngo.website && (
                  <a 
                    href={ngo.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center text-white/90 hover:text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 transition-all duration-300 transform hover:scale-105"
                    title={`Visit ${ngo.name} website`}
                  >
                    <Icons.externalLink className="w-5 h-5 mr-3 text-cyan-300" />
                    <span className="font-medium">Visit Website</span>
                  </a>
                )}
              </div>
              
              <p className="text-white/95 text-xl max-w-4xl mb-10 leading-relaxed font-light">
                {ngo.description}
              </p>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-red-600 hover:via-pink-600 hover:to-rose-600 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20"
                >
                  <Icons.favorite className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  <span className="text-lg">Donate Now</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group border-3 border-white text-white hover:bg-white hover:text-blue-900 font-bold px-10 py-5 rounded-2xl backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                >
                  <Icons.users className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  <span className="text-lg">Volunteer with Us</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Enhanced Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Beautiful Mission Section */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden rounded-3xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <CardContent className="p-10">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-4 rounded-2xl mr-6 shadow-lg">
                    <Icons.target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Our Mission</h2>
                </div>
                <div className="prose prose-xl text-gray-700 leading-relaxed">
                  <p className="text-lg font-light leading-relaxed">
                    {ngo.mission || ngo.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Programs Section */}
            <div>
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 p-4 rounded-2xl mr-6 shadow-lg">
                  <Icons.calendar className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Upcoming Programs</h2>
              </div>
              
              <div className="space-y-8">
                {programs.length === 0 ? (
                  <Card className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 border-0 rounded-3xl overflow-hidden">
                    <CardContent className="text-center py-20">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-2xl"></div>
                        <Icons.calendar className="relative w-20 h-20 text-gray-400 mx-auto" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-600 mb-3">No upcoming programs</h3>
                      <p className="text-gray-500 text-lg">Check back soon for exciting new initiatives!</p>
                    </CardContent>
                  </Card>
                ) : (
                  programs.map((program) => (
                    <Card key={program.id} className="bg-white/90 backdrop-blur-sm shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 rounded-3xl group">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-80 h-64 md:h-auto relative overflow-hidden">
                            <img 
                              src={program.imageUrl || 'https://images.pexels.com/photos/6646968/pexels-photo-6646968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                              alt={program.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            <div className="absolute top-6 right-6">
                              <StatusBadge status={program.status} variant="solid" size="lg" />
                            </div>
                          </div>
                          
                          <div className="flex-grow p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">{program.title}</h3>
                            
                            <div className="flex flex-wrap gap-6 mb-6">
                              <div className="flex items-center text-gray-600 bg-blue-50 px-4 py-2 rounded-full">
                                <Icons.calendar className="w-5 h-5 mr-3 text-blue-500" />
                                <span className="font-medium">
                                  {formatDate(program.startDate)}
                                  {program.endDate ? ` - ${formatDate(program.endDate)}` : ''}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600 bg-green-50 px-4 py-2 rounded-full">
                                <Icons.location className="w-5 h-5 mr-3 text-green-500" />
                                <span className="font-medium">{program.location}</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                              {truncateText(program.description, 150)}
                            </p>
                            
                            {program.capacity && program.currentParticipants !== undefined && (
                              <div className="mb-6">
                                <div className="flex justify-between text-sm mb-3">
                                  <span className="font-semibold text-gray-700">Participation Progress</span>
                                  <span className="text-gray-600 font-medium">{program.currentParticipants}/{program.capacity}</span>
                                </div>
                                <ProgressBar 
                                  value={program.currentParticipants} 
                                  max={program.capacity}
                                  size="md"
                                  className="bg-gray-200 rounded-full"
                                />
                              </div>
                            )}
                            
                            <Link to={`/programs/${program.id}`}>
                              <Button variant="primary" size="lg" className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 text-white font-bold px-8 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                                <span className="text-lg">View Details</span>
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
              {programs.length > 0 && (
                <div className="mt-4 text-right">
                  <Link to={`/ngos/${ngo.id}/programs`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all programs →
                  </Link>
                </div>
              )}
            </div>

            {/* Enhanced Testimonials Section */}
            <div>
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-purple-500 via-pink-600 to-rose-700 p-4 rounded-2xl mr-6 shadow-lg">
                  <Icons.heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">What People Say</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.length === 0 ? (
                  <div className="col-span-2">
                    <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-0 rounded-3xl">
                      <CardContent className="text-center py-16">
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-2xl"></div>
                          <Icons.heart className="relative w-16 h-16 text-gray-400 mx-auto" />
                        </div>
                        <p className="text-gray-500 text-lg">No testimonials available yet.</p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                      <CardContent className="relative p-8">
                        <div className="absolute top-4 right-4 text-purple-200 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                          </svg>
                        </div>
                        <p className="text-gray-700 italic mb-6 pt-4 text-lg leading-relaxed font-light">
                          "{truncateText(testimonial.content, 120)}"
                        </p>
                        <div className="flex items-center">
                          <div className="w-14 h-14 rounded-full overflow-hidden mr-4 ring-4 ring-purple-100">
                            <img 
                              src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.authorName)}&background=8b5cf6&color=fff&size=56`} 
                              alt={testimonial.authorName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-lg">{testimonial.authorName}</h4>
                            {testimonial.authorRole && (
                              <p className="text-purple-600 font-medium">{testimonial.authorRole}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Enhanced Media Gallery */}
            <div>
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-orange-500 via-red-600 to-pink-700 p-4 rounded-2xl mr-6 shadow-lg">
                  <Icons.image className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Media Gallery</h2>
              </div>
              {mediaItems.length === 0 ? (
                <Card className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 border-0 rounded-3xl">
                  <CardContent className="text-center py-20">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-500/20 rounded-full blur-2xl"></div>
                      <Icons.image className="relative w-20 h-20 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-600 mb-3">No media available</h3>
                    <p className="text-gray-500 text-lg">Photos and videos will be displayed here.</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="relative">
                      <div className="h-96 rounded-2xl overflow-hidden shadow-xl">
                        {activeMedia.type === 'image' ? (
                          <img 
                            src={activeMedia.url} 
                            alt={activeMedia.title || 'Gallery item'} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-2xl">
                            <a 
                              href={activeMedia.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex flex-col items-center justify-center text-white hover:text-blue-300 transition-colors duration-300 group"
                            >
                              <Icons.video className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300" />
                              <span className="text-xl font-bold">Watch Video</span>
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <button 
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300 shadow-lg"
                        onClick={handlePrevMedia}
                        aria-label="Previous media"
                      >
                        <Icons.chevronLeft className="w-6 h-6" />
                      </button>
                      
                      <button 
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300 shadow-lg"
                        onClick={handleNextMedia}
                        aria-label="Next media"
                      >
                        <Icons.chevronRight className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-bold text-xl text-gray-800">
                        {activeMedia.title || 'Gallery item'}
                      </h3>
                      {activeMedia.description && (
                        <p className="text-gray-600 mt-2 text-lg">
                          {activeMedia.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-6 flex overflow-x-auto space-x-4 pb-4">
                      {mediaItems.map((item, index) => (
                        <button 
                          key={item.id}
                          className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-4 transition-all duration-300 ${
                            index === activeMediaIndex 
                              ? 'border-blue-500 shadow-lg scale-110' 
                              : 'border-transparent hover:border-gray-300'
                          }`}
                          onClick={() => setActiveMediaIndex(index)}
                        >
                          {item.type === 'image' ? (
                            <img 
                              src={item.url} 
                              alt={item.title || 'Thumbnail'} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                              <Icons.video className="w-8 h-8 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Enhanced Beautiful Sidebar */}
          <div className="space-y-10">
            {/* Stunning Contact Information Card */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden rounded-3xl hover:shadow-3xl transition-all duration-500">
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 p-6">
                <div className="flex items-center text-white">
                  <div className="bg-white/20 p-3 rounded-2xl mr-4">
                    <Icons.phone className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">Contact Information</h3>
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="group flex items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-100">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icons.location className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{ngo.address}</p>
                      <p className="text-gray-600 font-medium">{ngo.city}, {ngo.state}</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-100">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icons.phone className="w-6 h-6 text-white" />
                    </div>
                    <a href={`tel:${ngo.contactPhone}`} className="text-green-700 hover:text-green-800 font-bold text-lg hover:underline transition-all duration-300">
                      {ngo.contactPhone}
                    </a>
                  </div>
                  
                  <div className="group flex items-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 border border-purple-100">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icons.email className="w-6 h-6 text-white" />
                    </div>
                    <a href={`mailto:${ngo.contactEmail}`} className="text-purple-700 hover:text-purple-800 font-bold text-lg hover:underline transition-all duration-300">
                      {ngo.contactEmail}
                    </a>
                  </div>
                  
                  {ngo.website && (
                    <div className="group flex items-center p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl hover:from-cyan-100 hover:to-blue-100 transition-all duration-300 border border-cyan-100">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Icons.externalLink className="w-6 h-6 text-white" />
                      </div>
                      <a 
                        href={ngo.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-cyan-700 hover:text-cyan-800 font-bold text-lg hover:underline transition-all duration-300"
                      >
                        {new URL(ngo.website).hostname}
                      </a>
                    </div>
                  )}
                </div>
                
                {ngo.socialLinks && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
                    <h4 className="text-lg font-bold mb-6 text-gray-800">Follow Us</h4>
                    <div className="flex justify-center space-x-4">
                      {ngo.socialLinks.facebook && (
                        <a 
                          href={ngo.socialLinks.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title={`${ngo.name} on Facebook`}
                          aria-label={`${ngo.name} on Facebook`}
                          className="group w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          <Icons.facebook className="w-6 h-6 group-hover:animate-bounce" />
                        </a>
                      )}
                      {ngo.socialLinks.twitter && (
                        <a 
                          href={ngo.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title={`${ngo.name} on Twitter`}
                          aria-label={`${ngo.name} on Twitter`}
                          className="group w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-center text-white hover:from-sky-600 hover:to-sky-700 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          <Icons.twitter className="w-6 h-6 group-hover:animate-bounce" />
                        </a>
                      )}
                      {ngo.socialLinks.instagram && (
                        <a 
                          href={ngo.socialLinks.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title={`${ngo.name} on Instagram`}
                          aria-label={`${ngo.name} on Instagram`}
                          className="group w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white hover:from-pink-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          <Icons.instagram className="w-6 h-6 group-hover:animate-bounce" />
                        </a>
                      )}
                      {ngo.socialLinks.linkedin && (
                        <a 
                          href={ngo.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title={`${ngo.name} on LinkedIn`}
                          aria-label={`${ngo.name} on LinkedIn`}
                          className="group w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-800 flex items-center justify-center text-white hover:from-blue-800 hover:to-blue-900 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          <Icons.linkedin className="w-6 h-6 group-hover:animate-bounce" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Action Buttons */}
            <div className="space-y-6">
              <Link to={`/donate/${ngo.id}`}>
                <Button 
                  className="group w-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-red-600 hover:via-pink-600 hover:to-rose-600 text-white font-bold py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
                >
                  <Icons.favorite className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  <span className="text-xl">Donate Now</span>
                </Button>
              </Link>
              
              <Link to={`/volunteer/ngo/${ngo.id}`}>
                <Button 
                  variant="outline" 
                  className="group w-full border-3 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-bold py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl bg-white/80 backdrop-blur-sm"
                >
                  <Icons.users className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  <span className="text-xl">Volunteer with Us</span>
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="group w-full border-3 border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 font-bold py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <Icons.share className="w-6 h-6 mr-3 group-hover:animate-spin" />
                <span className="text-lg">Share NGO</span>
              </Button>
            </div>

            {/* Enhanced Notice Board */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-600 p-6">
                <div className="flex items-center text-white">
                  <div className="bg-white/20 p-3 rounded-2xl mr-4">
                    <Icons.info className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">Notice Board</h3>
                </div>
              </div>
              <CardContent className="p-8">
                <NoticeBoard notices={notices} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOProfile;