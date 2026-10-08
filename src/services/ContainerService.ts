import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API

export async function getContainers(){
    try {
        const response = await axios.get(`${API_BASE_URL}/containers`);
        const rawContainers = response.data.data;
        
        return rawContainers.map((container: any) => ({
            id: container.Id.substring(0, 12), 
            name: container.Names?.[0] ? container.Names[0].replace(/^\//, '') : 'Unnamed',
            image: container.Image,
            imageId: container.ImageID, 
            state: container.State,
            status: container.Status,
            ports: container.Ports && container.Ports.length > 0 ? container.Ports
            .filter((p: any) => p.PublicPort)
            .map((p: any) => `${p.PublicPort}:${p.PrivatePort}`)
            .join(', ') || '-': '-',
            created: container.Created,
        }));
  } catch (error) {
    console.error('Error with loading all containers via API:', error);
    throw error;
  }
}