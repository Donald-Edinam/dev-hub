interface Resource {
    title: string;
    url: string;
    description: string;
    tags: string[];
}

interface ValidationResult {
    isValid: boolean;
    errors: {
        title?: string;
        url?: string;
        description?: string;
        tags?: string;
    };
}

export const validateResource = (resource: Resource): ValidationResult => {
    const errors: ValidationResult['errors'] = {};

    if (!resource.title.trim()) {
        errors.title = 'Title is required';
    }

    if (!resource.url.trim()) {
        errors.url = 'URL is required';
    } else {
        try {
            new URL(resource.url);
        } catch {
            errors.url = 'Please enter a valid URL';
        }
    }

    if (!resource.description.trim()) {
        errors.description = 'Description is required';
    }

    if (!resource.tags.length) {
        errors.tags = 'At least one tag is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};