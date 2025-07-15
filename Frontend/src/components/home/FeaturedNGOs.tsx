import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Spinner } from '../ui/Spinner';
import { NGO } from '../../types';
import { truncateText } from '../../lib/utils';

interface FeaturedNGOsProps {
  ngos: NGO[];
  loading?: boolean;
  error?: string | null;
}

const FeaturedNGOs: React.FC<FeaturedNGOsProps> = ({ ngos, loading, error }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Featured NGOs</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover organizations making a difference in communities across India through their impactful programs and initiatives.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>Error loading NGOs: {error}</p>
          </div>
        ) : ngos.length === 0 ? (
          <div className="text-center text-slate-600">
            <p>No NGOs available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ngos.map((ngo) => (
                <Card key={ngo.id} isHoverable className="overflow-hidden flex flex-col h-full">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={ngo.logo}
                      alt={ngo.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="flex items-start justify-between mt-4">
                      <Link to={`/ngos/${ngo.id}`} className="group">
                        <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                          {ngo.name}
                        </h3>
                      </Link>
                      <Avatar
                        src={ngo.logo}
                        alt={ngo.name}
                        size="sm"
                        className="-mt-10 border-4 border-white shadow-sm"
                      />
                    </div>
                    <div className="flex items-center text-sm text-slate-500 mt-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{ngo.city}, {ngo.state}</span>
                    </div>
                    <p className="text-slate-600 mt-4 mb-6 flex-grow">
                      {truncateText(ngo.description, 120)}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <Link to={`/ngos/${ngo.id}`}>
                        <Button variant="primary" size="sm">
                          View Profile
                        </Button>
                      </Link>
                      {ngo.website && (
                        <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                          Website
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/ngos">
                <Button variant="outline" size="lg">
                  View All NGOs
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedNGOs;