export interface ContainerItem{
  id: string;              
  name: string;            
  image: string;           
  imageId: string;         
  state: 'running' | 'exited' | 'paused' | string; 
  status: string;          
  ports: string;           
  created: number;
}