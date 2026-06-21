'use client';

import React, { useState, useRef } from 'react';
import { 
    Form, 
    Fieldset, 
    TextField, 
    TextArea, 
    Label, 
    Input, 
    FieldError, 
    Select, 
    ListBox, 
    Button, 
    toast
} from '@heroui/react';
import { ArrowUpToLine, BookOpen, ArrowRight, ChevronDown, Flame } from '@gravity-ui/icons';
import { createEbooks } from '@/lib/actions/addEbooks';

const textInputClass = "w-full bg-[#161b2e] border border-slate-800 text-slate-200 rounded-xl px-3 py-2.5 outline-none placeholder:text-slate-600 focus:border-indigo-600/80 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-[#161b2e] border border-slate-800 text-slate-200 rounded-xl px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-indigo-600/50";
const popoverClasses = "bg-[#0e111d] border border-slate-800 rounded-xl p-1 shadow-2xl min-w-[200px]";
const listItemClasses = "text-slate-300 px-3 py-2 rounded-lg cursor-pointer hover:bg-indigo-600 hover:text-white outline-none data-[focused=true]:bg-indigo-600";
const textAreaClass = "w-full bg-[#161b2e] border border-slate-800 text-slate-200 rounded-xl p-3 outline-none placeholder:text-slate-600 focus:border-indigo-600/80 transition resize-none";

export default function AddEbookForm({ writer }) {
  
    const formRef = useRef(null); 
    const [errors, setErrors] = useState({});
    const [coverUrl, setCoverUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

 
    const handleCoverUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, cover: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                setCoverUrl(data.data.url);
                setErrors(prev => ({ ...prev, cover: null }));
                toast.success("Cover image uploaded successfully!");
            } else {
                setErrors(prev => ({ ...prev, cover: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, cover: "Network error during upload" }));
        } finally {
            setIsUploading(false);
        }
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const title = formData.get('title');
        const price = formData.get('price');
        const category = formData.get('category');
        const tags = formData.get('tags');
        const description = formData.get('description');

       
        const newErrors = {};
        if (!title) newErrors.title = "Book title is required";
        if (!price || isNaN(price)) newErrors.price = "Valid price value is required";
        if (!description) newErrors.description = "Book description is required";
        if (!coverUrl) newErrors.cover = "Book cover image is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
  
        const newEbookData = {
            title,
            price: parseFloat(price),
            category: category || 'fiction',
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            description,
            coverImage: coverUrl,
            status: 'Pending', 
            writerId: writer?.id || '',
            writerName: writer?.name || 'Anonymous'
        };

        try {
            console.log("Submitting Ebook Payload Data:", newEbookData);
            const payload = await createEbooks(newEbookData);
            // console.log(payload);

            if (payload?.insertedId) {
                toast.success("Ebook added to publishing queue successfully!");
                
             
                setCoverUrl('');
                setErrors({});
                if (formRef.current) {
                    formRef.current.reset(); 
                }
            } else {
                toast.error("Failed to add ebook. Please try again.");
            }
        } catch (error) {
            toast.error("Something went wrong during submission.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-8 bg-[#0e111d] p-8 border border-slate-900 rounded-2xl shadow-2xl">
            <Form ref={formRef} onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-xl font-bold text-white border-b border-slate-900 w-full pb-3 mb-2 tracking-tight flex items-center gap-2">
                        <BookOpen className="text-indigo-500" /> Publish New Masterpiece
                    </legend>

                 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="title" isInvalid={!!errors.title} className="flex flex-col gap-1 w-full">
                            <Label className="text-slate-400 font-medium text-sm">Ebook Title</Label>
                            <Input placeholder="e.g. The Chronicles of Fable" className={textInputClass} />
                            {errors.title && <FieldError className="text-xs text-rose-500 mt-1">{errors.title}</FieldError>}
                        </TextField>

                        <Select className={selectBoxClass} name="category" defaultSelectedKeys={['fiction']}>
                            <Label className="text-slate-400 font-medium text-sm mb-1 block">Genre Category</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-slate-200" />
                                <Select.Indicator><ChevronDown size={16} className="text-slate-500" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="fiction" className={listItemClasses} textValue="Fiction">Fiction</ListBox.Item>
                                    <ListBox.Item id="non-fiction" className={listItemClasses} textValue="Non-Fiction">Non-Fiction</ListBox.Item>
                                    <ListBox.Item id="sci-fi" className={listItemClasses} textValue="Sci-Fi & Fantasy">Sci-Fi & Fantasy</ListBox.Item>
                                    <ListBox.Item id="mystery" className={listItemClasses} textValue="Mystery & Thriller">Mystery & Thriller</ListBox.Item>
                                    <ListBox.Item id="biography" className={listItemClasses} textValue="Biography">Biography</ListBox.Item>
                                    <ListBox.Item id="horro" className={listItemClasses} textValue="Horror">Horro</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="price" defaultValue="0" isInvalid={!!errors.price} className="flex flex-col gap-1 w-full">
                            <Label className="text-slate-400 font-medium text-sm">Price (USD)</Label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-slate-500 text-sm font-semibold select-none border-r border-slate-800 pr-2">
                                    $
                                </span>
                                <Input placeholder="0.00 (Enter 0 for Free)" className={`${textInputClass} pl-10`} />
                            </div>
                            {errors.price && <FieldError className="text-xs text-rose-500 mt-1">{errors.price}</FieldError>}
                        </TextField>

                        <TextField name="tags" className="flex flex-col gap-1 w-full">
                            <Label className="text-slate-400 font-medium text-sm">Search Tags</Label>
                            <div className="relative flex items-center">
                                <Flame size={16} className="absolute left-3 text-slate-600 pointer-events-none z-10" />
                                <Input placeholder="novel, fantasy, adventure (comma separated)" className={`${textInputClass} pl-10`} />
                            </div>
                        </TextField>
                    </div>

                   
                    <div className="flex flex-col gap-1 w-full">
                        <span className="text-slate-400 font-medium text-sm">Book Cover Image</span>
                        <div className="flex items-center gap-4 mt-1 bg-[#161b2e]/30 border border-slate-900 p-4 rounded-xl">
                            <label className="w-16 h-24 border border-dashed border-slate-700 hover:border-indigo-500 bg-[#161b2e] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden shrink-0 shadow-inner">
                                <input 
                                    type="file" 
                                    accept="image/png, image/jpeg" 
                                    onChange={handleCoverUpload} 
                                    className="hidden" 
                                />
                                {coverUrl ? (
                                    <img src={coverUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <ArrowUpToLine size={20} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                )}
                            </label>
                            
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-300">
                                    {isUploading ? 'Uploading artwork...' : 'Upload cover template'}
                                </span>
                                <span className="text-xs text-slate-600 mt-0.5">High-res portrait format (PNG, JPG up to 5MB)</span>
                                {errors.cover && <span className="text-xs text-rose-500 font-medium mt-1">{errors.cover}</span>}
                            </div>
                        </div>
                    </div>

                   
                    <TextField name="description" isInvalid={!!errors.description} className="flex flex-col gap-1 w-full">
                        <Label className="text-slate-400 font-medium text-sm">Ebook Synopsis / Overview</Label>
                        <TextArea
                            placeholder="Draft a compelling synopsis to captivate potential readers..."
                            rows={5}
                            className={textAreaClass}
                        />
                        {errors.description && <FieldError className="text-xs text-rose-500 mt-1">{errors.description}</FieldError>}
                    </TextField>
                </Fieldset>

              
                <div className="flex justify-end gap-3 pt-5 border-t border-slate-900 w-full">
                    <Button
                        type="submit"
                        isDisabled={isUploading || isSubmitting}
                        className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 rounded-xl px-6 transition-all h-11 shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish Book Assets'} <ArrowRight size={16} className="ml-1" />
                    </Button>
                </div>
            </Form>
        </div>
    );
}