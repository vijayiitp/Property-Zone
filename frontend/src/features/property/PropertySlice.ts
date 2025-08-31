// propertySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PropertyType {
  _id: string;
  locality: string;
  image: string;
  price: number;
  city: string;
  squareFeet: number;
  name: string;
  userId: string;
  discountedPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  type?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PropertyState {
  properties: PropertyType[];
  loading: boolean;
  error: string | null;
  selectedProperty: PropertyType | null;
}

const initialState: PropertyState = {
  properties: [],
  loading: false,
  error: null,
  selectedProperty: null,
};

// Async thunk to fetch properties
export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/user/propertylist`,
        { withCredentials: true }
      );
      console.log("Fetched properties:", response.data);
      return response.data.products || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch properties');
    }
  }
);

// Async thunk to add a new property
export const addProperty = createAsyncThunk(
  'property/addProperty',
  async (propertyData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/newProperty`,
        propertyData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.property || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add property');
    }
  }
);

// Async thunk to delete a property
export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  async (propertyId: string, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/user/property/${propertyId}`,
        { withCredentials: true }
      );
      return propertyId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete property');
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedProperty: (state, action: PayloadAction<PropertyType | null>) => {
      state.selectedProperty = action.payload;
    },
    updateProperty: (state, action: PayloadAction<PropertyType>) => {
      const index = state.properties.findIndex(
        (property) => property._id === action.payload._id
      );
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
    },
    addPropertyToState: (state, action: PayloadAction<PropertyType>) => {
      state.properties.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action: PayloadAction<PropertyType[]>) => {
        state.loading = false;
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add Property
      .addCase(addProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProperty.fulfilled, (state, action: PayloadAction<PropertyType>) => {
        state.loading = false;
        state.properties.unshift(action.payload);
        state.error = null;
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete Property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.properties = state.properties.filter(
          (property) => property._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearError, 
  setSelectedProperty, 
  updateProperty, 
  addPropertyToState 
} = propertySlice.actions;

export default propertySlice.reducer;
