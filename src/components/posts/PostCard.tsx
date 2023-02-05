interface IPostCard {
  slug: string;
  title: string;
  description: string;
  src?: string;
  double: string;
  intersection: boolean;
}

export default function PostCard(props: IPostCard) {
  const { slug, title, description, src, double, intersection } = props;
  return (
    <a href={"blog/" + slug} className='flex items-stretch min-h-full'>
      <div className='rounded-lg shadow-lg bg-white'>
        <div>
          <img
            className='rounded-t-lg'
            src={intersection ? (src ? src : double) : ""}
            alt={title}
          />
        </div>
        <div className='py-12 px-6 h-[300px] lg:h-[380px]'>
          <p className='text-gray-900 text-xl lg:text-2xl font-bold mb-4 hover:underline transition duration-1000'>
            {title}
          </p>
          <p className='text-gray-700 text-sm lg:text-lg mb-8'>{description}</p>
        </div>
      </div>
    </a>
  );
}
