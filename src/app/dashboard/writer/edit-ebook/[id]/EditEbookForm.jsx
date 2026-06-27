'use client';

import React, { useState, useEffect } from 'react';
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
  
} from '@heroui/react';
import { ArrowUpToLine, BookOpen, ArrowRight, ChevronDown, Flame } from '@gravity-ui/icons';
import { useRouter } from 'next/navigation';
import { updateEbook } from '@/lib/api/ebooks';
import toast from 'react-hot-toast';


const textInputClass = "w-full bg-[#F8FAFC] border-2 border-slate-200 text-[#0F172A] font-medium rounded-xl px-4 py-3 outline-none placeholder:text-slate-400 focus:border-[#6366F1] focus:bg-white transition-all";
const selectBoxClass = "w-full flex flex-col gap-1.5";
const triggerClasses = "w-full bg-[#F8FAFC] border-2 border-slate-200 text-[#0F172A] font-medium rounded-xl px-4 py-3 flex items-center justify-between outline-none data-[hover=true]:border-[#6366F1] transition-all";
const popoverClasses = "bg-white border-2 border-slate-200 rounded-xl p-1 shadow-xl min-w-[200px] z-50 animate-in fade-in slide-in-from-top-1 duration-200";
const listItemClasses = "text-[#0F172A] font-semibold px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#6366F1] hover:text-white outline-none data-[focused=true]:bg-[#6366F1] data-[focused=true]:text-white transition-colors";
const textAreaClass = "w-full bg-[#F8FAFC] border-2 border-slate-200 text-[#0F172A] font-medium rounded-xl p-4 outline-none placeholder:text-slate-400 focus:border-[#6366F1] focus:bg-white transition-all resize-none";

export default function EditEbookForm({ writer, ebook }) {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    
 
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('fiction');
    const [price, setPrice] = useState('0');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [coverUrl, setCoverUrl] = useState('');

    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (ebook) {
            const timer = setTimeout(() => {
                setTitle(ebook.title || '');
                setCategory(ebook.category || 'fiction');
                setPrice(ebook.price !== undefined ? ebook.price.toString() : '0');
                setTags(Array.isArray(ebook.tags) ? ebook.tags.join(", ") : ebook.tags || '');
                setDescription(ebook.description || '');
                setCoverUrl(ebook.coverImage || '');
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [ebook]);

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
               toast.success("Cover image updated successfully!");
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

        const updatedEbookData = {
            title,
            price: parseFloat(price),
            category: category || 'fiction',
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            description,
            coverImage: coverUrl
        };

        try {
          
            const res = await updateEbook(ebook?._id, updatedEbookData);
            
            if (res) {
               toast.success("Ebook masterpiece updated successfully!");
                router.push('/dashboard/writer/my-ebooks');
                router.refresh();
            } else {
                toast.error("Failed to update ebook. Please try again.");
            }
        } catch (error) {
          toast.error("Something went wrong during update.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-8 bg-white p-8 border-2 border-slate-200 rounded-2xl shadow-md">
            <Form onSubmit={handleSubmit} className="space-y-6" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-6 w-full">
                    
                    <legend className="text-2xl font-serif font-black text-[#0F172A] border-b-2 border-slate-200 w-full pb-4 tracking-tight flex items-center gap-2.5">
                        <div className="p-2 bg-[#6366F1]/10 text-[#6366F1] rounded-lg">
                            <BookOpen size={20} className="stroke-[2.5]" />
                        </div> 
                        Edit Ebook Masterpiece
                    </legend>

                    {/* Title & Category Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="title" isInvalid={!!errors.title} className="flex flex-col gap-1.5 w-full">
                            <Label className="text-[#0F172A] font-bold text-xs uppercase tracking-wider">Ebook Title</Label>
                            <Input 
                                placeholder="e.g. The Chronicles of Fable" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={textInputClass} 
                            />
                            {errors.title && <FieldError className="text-xs font-semibold text-rose-500 mt-1">{errors.title}</FieldError>}
                        </TextField>

                        <Select 
                            className={selectBoxClass} 
                            name="category" 
                            selectedKeys={[category]}
                            onSelectionChange={(keys) => setCategory(Array.from(keys)[0])}
                        >
                            <Label className="text-[#0F172A] font-bold text-xs uppercase tracking-wider block">Genre Category</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-[#0F172A] font-semibold text-sm" />
                                <Select.Indicator><ChevronDown size={16} className="text-slate-500 stroke-[2.5]" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none border-0 p-0">
                                    <ListBox.Item id="fiction" className={listItemClasses} textValue="Fiction">Fiction</ListBox.Item>
                                    <ListBox.Item id="non-fiction" className={listItemClasses} textValue="Non-Fiction">Non-Fiction</ListBox.Item>
                                    <ListBox.Item id="sci-fi" className={listItemClasses} textValue="Sci-Fi & Fantasy">Sci-Fi & Fantasy</ListBox.Item>
                                    <ListBox.Item id="mystery" className={listItemClasses} textValue="Mystery & Thriller">Mystery & Thriller</ListBox.Item>
                                    <ListBox.Item id="biography" className={listItemClasses} textValue="Biography">Biography</ListBox.Item>
                                    <ListBox.Item id="horror" className={listItemClasses} textValue="Horror">Horror</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Pricing & Tags Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="price" isInvalid={!!errors.price} className="flex flex-col gap-1.5 w-full">
                            <Label className="text-[#0F172A] font-bold text-xs uppercase tracking-wider">Price (USD)</Label>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 text-[#64748B] text-sm font-bold select-none border-r-2 border-slate-200 pr-3 z-10">
                                    $
                                </span>
                                <Input 
                                    placeholder="0.00" 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className={`${textInputClass} pl-12`} 
                                />
                            </div>
                            {errors.price && <FieldError className="text-xs font-semibold text-rose-500 mt-1">{errors.price}</FieldError>}
                        </TextField>

                        <TextField name="tags" className="flex flex-col gap-1.5 w-full">
                            <Label className="text-[#0F172A] font-bold text-xs uppercase tracking-wider">Search Tags</Label>
                            <div className="relative flex items-center">
                                <Flame size={16} className="absolute left-4 text-[#F59E0B] stroke-[2.5] pointer-events-none z-10" />
                                <Input 
                                    placeholder="novel, fantasy, adventure" 
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    className={`${textInputClass} pl-12`} 
                                />
                            </div>
                        </TextField>
                    </div>

                    {/* Book Cover Module */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <span className="text-[#0F172A] font-bold text-xs uppercase tracking-wider">Book Cover Image</span>
                        <div className="flex items-center gap-5 mt-1 bg-[#F8FAFC] border-2 border-slate-200 p-4 rounded-xl">
                            <label className="w-20 h-28 border-2 border-dashed border-slate-300 hover:border-[#6366F1] bg-white rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden shrink-0 shadow-xs">
                                <input 
                                    type="file" 
                                    accept="image/png, image/jpeg" 
                                    onChange={handleCoverUpload} 
                                    className="hidden" 
                                />
                                {coverUrl ? (
                                    <img src={coverUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <ArrowUpToLine size={20} className="text-slate-400 group-hover:text-[#6366F1] transition-colors stroke-[2.5]" />
                                )}
                            </label>
                            
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-[#0F172A]">
                                    {isUploading ? 'Uploading artwork blueprint...' : 'Change cover template artwork'}
                                </span>
                                <span className="text-xs text-[#64748B] font-medium mt-0.5">High-resolution portrait asset formats (PNG, JPG up to 5MB)</span>
                                {errors.cover && <span className="text-xs text-rose-500 font-bold mt-1.5">{errors.cover}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Description TextArea Field */}
                    <TextField name="description" isInvalid={!!errors.description} className="flex flex-col gap-1.5 w-full">
                        <Label className="text-[#0F172A] font-bold text-xs uppercase tracking-wider">Ebook Synopsis / Overview</Label>
                        <TextArea
                            placeholder="Draft a compelling synopsis..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            className={textAreaClass}
                        />
                        {errors.description && <FieldError className="text-xs font-semibold text-rose-500 mt-1">{errors.description}</FieldError>}
                    </TextField>
                </Fieldset>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-5 border-t-2 border-slate-200 w-full">
                    <Button
                        type="submit"
                        disabled={isUploading || isSubmitting}
                        className="bg-[#0F172A] text-white font-bold hover:bg-black rounded-xl px-6 transition-all h-12 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                        {isSubmitting ? 'Saving Changes...' : 'Save Changes'} <ArrowRight size={16} className="stroke-[2.5]" />
                    </Button>
                </div>
            </Form>
        </div>
    );
}