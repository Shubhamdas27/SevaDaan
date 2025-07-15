import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../icons';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Spinner } from '../ui/Spinner';
import { Program } from '../../types';
import { formatDate } from '../../lib/utils';
import { getProgramStatusBadge } from '../../lib/status-utils';

interface FeaturedProgramsProps {
  programs: Program[];
  loading?: boolean;
  error?: string | null;
}

const FeaturedPrograms: React.FC<FeaturedProgramsProps> = ({ programs, loading, error }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Featured Programs</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore programs and initiatives that are making a positive impact in communities across India.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>Error loading programs: {error}</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center text-slate-600">
            <p>No programs available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program) => (
                <Card key={program.id} isHoverable className="overflow-hidden flex flex-col h-full">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={program.imageUrl || 'https://images.pexels.com/photos/6646968/pexels-photo-6646968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      {getProgramStatusBadge(program.status)}
                    </div>
                  </div>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="mt-4">
                      <Link to={`/programs/${program.id}`} className="group">
                        <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                          {program.title}
                        </h3>
                      </Link>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 mt-2">
                      <Icons.location className="w-4 h-4 mr-1" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 mt-1">
                      <Icons.calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(program.startDate)}{program.endDate ? ` - ${formatDate(program.endDate)}` : ''}</span>
                    </div>
                    <p className="text-slate-600 mt-4 mb-4 flex-grow">
                      {program.description.length > 120
                        ? `${program.description.substring(0, 120)}...`
                        : program.description
                      }
                    </p>
                    
                    {program.capacity && program.currentParticipants !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Participation</span>
                          <span className="text-slate-600">{program.currentParticipants}/{program.capacity}</span>
                        </div>
                        <ProgressBar 
                          value={program.currentParticipants} 
                          max={program.capacity} 
                          variant={program.status === 'completed' ? 'success' : 'primary'}
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-auto">
                      <Link to={`/programs/${program.id}`}>
                        <Button variant="primary" size="sm" rightIcon={<Icons.arrowRight className="w-4 h-4" />}>
                          Learn More
                        </Button>
                      </Link>
                      <Link to={`/ngos/${program.ngoId}`} className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                        View NGO
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/programs">
                <Button variant="outline" size="lg">
                  View All Programs
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedPrograms;