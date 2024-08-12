import axios, { AxiosInstance, AxiosResponse } from "axios";

const BASE_URL: string = "http://localhost:5000/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Bin {
  id: string;
  lastEdit: string;
  temperature: string;
  battery: number;
  fillLevel: number;
  // longitude: number;
  // latitude: number;
}

export interface Weather {
  dev_id: string;
  time: string;
  rtc: string;
  battery: number;
  solarpanel: string;
  command	: string;
  solar	: number;
  precipitation	: number;
  strikes	: number;
  windspeed	: number;
  winddirection	: number;
  gustspeed	: number;
  vapourpressure	: number;
  atmosphericpressure	: number;
  relativehumidity	: number;
  airTemp	: number;
  lat_long	: string;
  sensor_name: string;
}

export interface Pedestrian {
  lastEdit: string;
  region:	string;
  numVisitors: number	
  dev_id: string;
}


export interface DetailedBin extends Bin {
  sensorName: string;
  latitude: number;
  longitude: number;
}

export interface Predictions {
}

export interface OptPath {
}

export const getBins = async (): Promise<Bin[]> => {
  try {
    const response: AxiosResponse<Bin[]> = await apiClient.get("/bins");
    return response.data;
  } catch (error) {
    console.error("Error fetching bins:", error);
    throw error;
  }
};

export const getBinStatus = async (id: string): Promise<Bin> => {
  try {
    const response: AxiosResponse<Bin> = await apiClient.get(
      `/bins/${id}/status`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bin status:", error);
    throw error;
  }
};

export const getBinDetails = async (id: string): Promise<DetailedBin> => {
  try {
    const response: AxiosResponse<DetailedBin> = await apiClient.get(
      `/bins/${id}/details`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bin details:", error);
    throw error;
  }
};

/// weather
export const getWeather = async (): Promise<Weather[]> => {
  try {
    const response: AxiosResponse<Weather[]> = await apiClient.get("/weather");
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

/// Pedestrian
export const getPedestrian = async (): Promise<Pedestrian[]> => {
  try {
    const response: AxiosResponse<Pedestrian[]> = await apiClient.get("/pedestrians");
    return response.data;
  } catch (error) {
    console.error("Error fetching Pedestrian:", error);
    throw error;
  }
};

// Predictions 
export const getPredictions = async (): Promise<Predictions[]> => {
  try {
    const response: AxiosResponse<Predictions[]> = await apiClient.get("/predictions");
    return response.data;
  } catch (error) {
    console.error("Error fetching Predictions:", error);
    throw error;
  }
};

export const getOptimalPath = async (): Promise<OptPath[]> => {
  try {
    const response: AxiosResponse<OptPath[]> = await apiClient.get("/optimalpath");
    return response.data;
  } catch (error) {
    console.error("Error fetching Predictions:", error);
    throw error;
  }
};