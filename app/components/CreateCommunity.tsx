"use client";

// CommunitySignupForm.tsx
import React, { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
// Types
type FormData = {
  fullName: string;
  email: string;
  phone: string;
  communityName: string;
  category: string;
  description: string;
  eligibility: string;
  rules: string;
  privacy: 'public' | 'restricted' | 'private';
  tags: string[];
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

// Privacy option descriptions
const PRIVACY_DESCRIPTIONS = {
  public: 'Public - Anyone can view and join',
  restricted: 'Restricted - Anyone can view, approval required to join',
  private: 'Private - Only visible to invited members'
};

// Categories for communities
const CATEGORIES = [
  { value: 'sports', label: 'Sports & Recreation' },
  { value: 'arts', label: 'Arts & Culture' },
  { value: 'education', label: 'Education & Learning' },
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'environment', label: 'Environment' },
  { value: 'support', label: 'Support Group' },
  { value: 'hobby', label: 'Hobby & Interests' },
  { value: 'other', label: 'Other' }
];

const CommunitySignupForm: React.FC = () => {
  const router = useRouter(); // ✅ Inside component
  // State for current step
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    communityName: '',
    category: '',
    description: '',
    eligibility: '',
    rules: '',
    privacy: 'public',
    tags: []
  });
  
  // Form validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  
  // State for tag input
  const [tagInput, setTagInput] = useState<string>('');
  
  // State for form submission
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Ref for tags input
  const tagsInputRef = useRef<HTMLInputElement>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle radio button changes
  const handlePrivacyChange = (value: 'public' | 'restricted' | 'private') => {
    setFormData(prev => ({
      ...prev,
      privacy: value
    }));
  };
  
  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  
  // Add tag when Enter is pressed
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      
      // Don't add duplicate tags
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      
      setTagInput('');
    }
  };
  
  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate the current step
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
        isValid = false;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.communityName.trim()) {
        newErrors.communityName = 'Community name is required';
        isValid = false;
      }
      
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
        isValid = false;
      }
    } else if (step === 3) {
      if (!formData.eligibility.trim()) {
        newErrors.eligibility = 'Eligibility criteria is required';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Navigate to next step
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  // Navigate to previous step
  const goToPrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  // Go directly to a specific step
  const goToStep = (step: number) => {
    // Only allow moving to steps that are already validated or previous steps
    if (step < currentStep) {
      setCurrentStep(step);
    } else if (step > currentStep) {
      // Validate all previous steps
      let canProceed = true;
      for (let i = currentStep; i < step; i++) {
        if (!validateStep(i)) {
          canProceed = false;
          break;
        }
      }
      
      if (canProceed) {
        setCurrentStep(step);
      }
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    try {
      const res = await fetch("/api/createcommunity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         fullName: formData.fullName,
         email: formData.email, 
       
         phone: formData.phone,
         communityName: formData.communityName,
         category: formData.category,
         description: formData.description,
         eligibility: formData.eligibility,
         rules: formData.rules,
         tags: formData.tags,
         privacy: formData.privacy,
        
        }),
      });
      console.log(formData);


      
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Registration failed.");
      }
  
      console.log("User registered successfully:", data);
  
      // ✅ Redirect to homepage
      router.push("/");
    } catch (error) {
      console.log("Error registering user:", error);
    } 
  };
  
  // Get the category label from its value
  const getCategoryLabel = (value: string): string => {
    const category = CATEGORIES.find(cat => cat.value === value);
    return category ? category.label : '';
  };
  
  // Reset the form
  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      communityName: '',
      category: '',
      description: '',
      eligibility: '',
      rules: '',
      privacy: 'public',
      tags: []
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setErrors({});
  };
  
  // Focus the tag input when clicking on the container
  const focusTagsInput = () => {
    if (tagsInputRef.current) {
      tagsInputRef.current.focus();
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-3xl">
        {/* Progress bar */}
        <div className="bg-indigo-600 p-5 relative">
          <div className="flex justify-between relative z-10">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center relative cursor-pointer
                  ${currentStep >= step ? 'bg-white text-indigo-600 font-bold' : 'bg-indigo-300 text-indigo-100'}`}
                onClick={() => goToStep(step)}
              >
                {step}
                <span className={`absolute -bottom-6 text-xs w-24 text-center ${currentStep >= step ? 'text-white font-medium' : 'text-indigo-200'}`}>
                  {step === 1 && "Your Info"}
                  {step === 2 && "Community Details"}
                  {step === 3 && "Settings"}
                  {step === 4 && "Review"}
                </span>
              </div>
            ))}
          </div>
          
          {/* Progress line */}
          <div className="absolute h-1 bg-indigo-300 top-9 left-0 w-full opacity-30" />
          <div 
            className="absolute h-1 bg-white top-9 left-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>
        
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center text-indigo-700 mb-8">Create Your Community</h1>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="form-group">
                  <label htmlFor="fullName" className="block font-medium text-black mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-colors text-black
                      ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'}`}
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="block font-medium text-black mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-colors text-black
                      ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="block font-medium text-black mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-colors"
                    placeholder="e.g., (123) 456-7890"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Next <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Community Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="form-group">
                  <label htmlFor="communityName" className="block font-medium text-black mb-2">
                    Community Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="communityName"
                    name="communityName"
                    value={formData.communityName}
                    onChange={handleChange}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:outline-none transition-colors text-black
                      ${errors.communityName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'}`}
                    placeholder="Enter a unique name for your community"
                  />
                  {errors.communityName && (
                    <p className="mt-1 text-sm text-red-600">{errors.communityName}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Choose a clear, descriptive name that represents your communitys purpose.</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="category" className="block font-medium text-black mb-2">
                    Community Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="description" className="block font-medium text-black mb-2">
                    Community Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 text-black focus:outline-none transition-colors
                      ${errors.description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'}`}
                    placeholder="Provide a detailed description of your community's purpose, goals, and activities"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                  <p className="mt-1 text-sm text-black">This will help potential members understand what your community is about.</p>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    <span className="mr-2">←</span> Back
                  </button>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Next <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Rules & Settings */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="form-group">
                  <label htmlFor="eligibility" className="block font-medium text-black mb-2">
                    Eligibility Criteria <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="eligibility"
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full p-3 border-2 text-black rounded-lg focus:ring-2 focus:outline-none transition-colors
                      ${errors.eligibility ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'}`}
                    placeholder="Describe who can join your community and any requirements for membership"
                  />
                  {errors.eligibility && (
                    <p className="mt-1 text-sm text-red-600">{errors.eligibility}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Specify age restrictions, location requirements, prerequisites, or any other criteria for joining.</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="rules" className="block font-medium text-black mb-2">
                    Community Rules (Optional)
                  </label>
                  <textarea
                    id="rules"
                    name="rules"
                    value={formData.rules}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 border-2 text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-colors"
                    placeholder="List any specific rules or guidelines for community members"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block font-medium text-black mb-3">
                    Privacy Setting
                  </label>
                  <div className="space-y-2">
                    {(['public', 'restricted', 'private'] as const).map(option => (
                      <div key={option} className="flex items-center">
                        <div 
                          className={`w-5 h-5 text-black rounded-full border-2 flex items-center justify-center mr-2 cursor-pointer
                            ${formData.privacy === option ? 'border-indigo-600' : 'border-gray-400'}`}
                          onClick={() => handlePrivacyChange(option)}
                        >
                          {formData.privacy === option && (
                            <div className="w-3 h-3 rounded-full bg-indigo-600" />
                          )}
                        </div>
                        <label 
                          className="cursor-pointer"
                          onClick={() => handlePrivacyChange(option)}
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{PRIVACY_DESCRIPTIONS[formData.privacy]}</p>
                </div>
                
                <div className="form-group">
                  <label className="block font-medium text-black mb-2">
                    Community Tags (Optional)
                  </label>
                  <div 
                    className="flex flex-wrap text-black items-center p-2 border-2 border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 min-h-16 cursor-text"
                    onClick={focusTagsInput}
                  >
                    {formData.tags.map(tag => (
                      <div key={tag} className="bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 m-1 flex items-center">
                        <span>{tag}</span>
                        <button
                          type="button"
                          className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTag(tag);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <input
                      ref={tagsInputRef}
                      type="text"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagKeyDown}
                      className="flex-grow p-2 border-none focus:outline-none bg-transparent"
                      placeholder={formData.tags.length === 0 ? "Type and press Enter to add tags" : ""}
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Add relevant keywords to help people find your community</p>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="flex items-center bg-gray-200 text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    <span className="mr-2">←</span> Back
                  </button>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Review <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-indigo-500">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black">{formData.communityName || 'Community Name'}</h3>
                      <p className="text-black">{formData.category ? getCategoryLabel(formData.category) : 'Category not specified'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Description:</h4>
                      <p className="text-black">{formData.description || 'No description provided.'}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700">Eligibility Criteria:</h4>
                      <p className="text-black">{formData.eligibility || 'No eligibility criteria provided.'}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700">Created By:</h4>
                      <p className="text-black">{formData.fullName || 'Anonymous'}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700">Privacy:</h4>
                      <p className="text-black">{formData.privacy.charAt(0).toUpperCase() + formData.privacy.slice(1)}</p>
                    </div>
                    
                    {formData.tags.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-700">Tags:</h4>
                        <div className="flex flex-wrap mt-2">
                          {formData.tags.map(tag => (
                            <span key={tag} className="bg-gray-200 text-black rounded-full px-3 py-1 text-sm mr-2 mb-2">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="flex items-center bg-gray-200 text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    <span className="mr-2">←</span> Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Create Community <span className="ml-2">✓</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Success message */}
            {isSubmitted && (
              <div className="text-center py-8 animate-fadeIn">
                <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Community Created Successfully!</h2>
                <p className="text-gray-600 mb-8">Your community is now live and ready for members to join.</p>
                <button
                  type="button"
                  className="animate-bounce inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg"
                  onClick={() => {
                    // In a real app, this would navigate to the community page
                    resetForm();
                  }}
                >
                  Go to Community <span className="ml-2">→</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunitySignupForm;