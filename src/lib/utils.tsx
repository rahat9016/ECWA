import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Clock, Truck, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toggle = (
  stateSetter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  key: string,
) => {
  stateSetter((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'shipped':
      return <Truck className="w-4 h-4 text-blue-600" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-600" />;
    case 'canceled':
      return <XCircle className="w-4 h-4 text-red-600" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-600" />;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'canceled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};


