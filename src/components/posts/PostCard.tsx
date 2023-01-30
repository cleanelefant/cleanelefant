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
    <a href={"blog/"+ slug} className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <div data-mdb-ripple="true" data-mdb-ripple-color="light">
          <img
            className="rounded-t-lg"
            src={intersection ? (src ? src : double) : ""}
            alt={title}
          />
        </div>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{title}</h5>
          <p className="text-gray-700 text-base mb-4">{description}</p>
        </div>
      </div>
    </a>
  );
}
