import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { AddResourceForm } from './AddResourceForm';
import { ResourceCard } from './ResourceCard';
import { SearchBar } from './Searchbar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';


interface Resource {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
}

interface NewResource {
  title: string;
  description: string;
  tags: string[];
  category: string;
}


const DevResourceHub = () => {
  const [resources, setResources] = useLocalStorage('resources', []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);  

  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

const handleAddResource = (newResource: NewResource) => {
    try {
        setResources([...resources, newResource]);
        setShowModal(false);
    } catch (err) {
        setError('Failed to add resource. Please try again.');
        setTimeout(() => setError(null), 3000);
    }
};

const handleDeleteResource = (id: string) => {
    try {
        setResources(resources.filter((r: Resource) => r.id !== id));
    } catch (err) {
        setError('Failed to delete resource. Please try again.');
        setTimeout(() => setError(null), 3000);
    }
};

const filteredResources: Resource[] = resources
    .filter((resource: Resource) => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((resource: Resource) => 
        selectedCategory === 'All' || resource.category === selectedCategory
    );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className='font-bold text-2xl'>Dev Resource Hub</h2>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Button onClick={() => setShowModal(true)}>Add Resource</Button>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <AddResourceForm onAdd={handleAddResource} />
      </Modal>
      
      <div className="space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              onDelete={handleDeleteResource}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No resources found. Try adjusting your search or add some resources!
          </p>
        )}
      </div>
    </div>
  );
};

export default DevResourceHub;
