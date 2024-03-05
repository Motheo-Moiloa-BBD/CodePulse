import { BlogImage } from '../shared/data-access/models/blog-image.model';

export const mockImages: BlogImage[] = [
  {
    id: '1',
    fileName: 'FirstImage',
    title: 'FirstImage',
    fileExtension: 'png',
    url: 'https://localhost:7097/Images/FirstImage.png',
  },
  {
    id: '2',
    fileName: 'SecondImage',
    title: 'SecondImage',
    fileExtension: 'jpg',
    url: 'https://localhost:7097/Images/SecondImage.jpg',
  },
  {
    id: '3',
    fileName: 'ThirdImage',
    title: 'ThirdImage',
    fileExtension: 'png',
    url: 'https://localhost:7097/Images/ThirdImage.png',
  },
  {
    id: '4',
    fileName: 'FourthImage',
    title: 'FourthImage',
    fileExtension: 'jpg',
    url: 'https://localhost:7097/Images/FourthImage.jpg',
  },
];
