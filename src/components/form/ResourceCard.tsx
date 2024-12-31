import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink } from 'lucide-react';

interface Resource {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

interface ResourceCardProps {
  resource: Resource;
  onDelete: (id: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onDelete }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              {resource.title}
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(resource.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-2">{resource.description}</p>
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
            {resource.category}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {resource.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};