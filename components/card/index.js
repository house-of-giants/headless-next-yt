import Link from 'next/link';

const Card = ({ imgSrc, imgSrcset, ytId, title, excerpt, link }) => (
  <div className="max-w-full">
    <div className="bg-white shadow-2xl" >
        <div className="h-56 bg-gray-300 overflow-hidden">
          {imgSrc && (
            <img className="object-cover w-full h-full" src={imgSrc} srcset={imgSrcset} />
          )}
          {ytId && (
            <iframe width="560" height="315" className="object-cover w-full h-full" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          )}
        </div>
      <div className="px-4 py-2 mt-2 bg-white">
        <h2 className="font-mono font-bold text-lg text-gray-800 truncate">
          {title}
        </h2>
        {excerpt && (
          <div className="sm:text-sm text-xs text-justify text-gray-700 my-3" dangerouslySetInnerHTML={{ __html: excerpt}} />
        )}
        {link && (
          <div className="flex items-center mt-8 mb-4">
            <Link href={link}>
              <a className="group font-mono text-xs shadow-underline relative">
                <span className="relative z-10">Read More</span>
                <span className="absolute w-14 h-1 group-hover:h-3 bg-pink-200 transition-height left-1/2 -ml-7 z-0 bottom-0.5"></span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Card