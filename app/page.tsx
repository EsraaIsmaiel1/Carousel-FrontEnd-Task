import Carousel from './components/Carousel';

export default function Home() {
  const slides = [
    {
      src: 'https://cdn.pixabay.com/photo/2021/01/10/18/01/milky-way-5905903_960_720.jpg',
      alt: 'Description of image 1',
    },
    {
      src: 'https://cdn.pixabay.com/photo/2021/09/26/14/37/milky-way-6657951_640.jpg',
      alt: 'Description of image 2',
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/02/09/09/11/starry-sky-2051448_640.jpg',
      alt: 'Description of image 3',
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="container flex items-center justify-center flex-col p-4 ">
        <Carousel slides={slides} title="My Carousel" />
      </div>
    </div>
  );
}
