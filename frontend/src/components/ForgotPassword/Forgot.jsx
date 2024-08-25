import React, { useState } from 'react';
import Navbar from '../utils/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Footer from '../utils/Footer';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Replace with your backend endpoint for password reset
      const response = await fetch(`/api/user/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/login");
        reset();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message || error);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 md:px-0 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="font-bold text-2xl mb-4">Forgot Password</h1>
          <p className="text-gray-500 mb-6">
            Enter your email to receive a password reset link.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full border-gray-300 rounded-lg focus-visible:ring-0  focus-visible:ring-offset-0"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: 'Enter a valid email',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            {isLoading ? <Button>
              <Loader2 className='animate-spin mr-2'></Loader2> please wait...
            </Button>:<Button type="submit">
              Send Reset Link
            </Button>}
          </form>

        </div>
      </div>
    </div>
  );
};

export default Forgot;
