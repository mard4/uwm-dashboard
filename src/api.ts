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
}

export interface Weather {
  temperature: number;
  humidity: number;
  precipitation: number;
  wind: number;
  pressure: number;
  timestamp: string;
}

export interface DetailedBin extends Bin {
  sensorName: string;
  latitude: number;
  longitude: number;
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
export const getWeather = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await apiClient.get(`/weather`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
