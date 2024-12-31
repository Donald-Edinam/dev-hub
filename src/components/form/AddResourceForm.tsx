import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


interface Resource {
    title: string;
    url: string;
    description: string;
    category: string;
    tags: string[];
}

interface AddResourceFormProps {
    onAdd: (resource: Resource & { id: number; tags: string[] }) => void;
}

export const AddResourceForm: React.FC<AddResourceFormProps> = ({ onAdd }) => {
  const [resource, setResource] = useState({
    title: '',
    url: '',
    description: '',
    category: 'Article',
    tags: ''
  });

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({
        ...resource,
        id: Date.now(),
        tags: resource.tags.split(',').map((tag: string) => tag.trim())
    });
    setResource({ title: '', url: '', description: '', category: 'Article', tags: '' });
};

  return (
    <Card className="w-[500px] p-5">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className='text-center text-2xl font-bold'>Add Your Resource </h1>
          <Input
            placeholder="Title"
            value={resource.title}
            onChange={(e) => setResource({...resource, title: e.target.value})}
            required
          />
          <Input
            placeholder="URL"
            type="url"
            value={resource.url}
            onChange={(e) => setResource({...resource, url: e.target.value})}
            required
          />
          <Input
            placeholder="Description"
            value={resource.description}
            onChange={(e) => setResource({...resource, description: e.target.value})}
          />
          <select
            className="w-full p-2 border rounded"
            value={resource.category}
            onChange={(e) => setResource({...resource, category: e.target.value})}
          >
            <option>Article</option>
            <option>Tutorial</option>
            <option>Tool</option>
            <option>Library</option>
          </select>
          <Input
            placeholder="Tags (comma-separated)"
            value={resource.tags}
            onChange={(e) => setResource({...resource, tags: e.target.value})}
          />
          <Button type="submit" className="w-full">Add Resource</Button>
        </form>
      </CardContent>
    </Card>
  );
};