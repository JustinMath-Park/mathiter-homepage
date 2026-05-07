import type { BlogAuthor, BlogLocale } from "@/types/blog";

interface Props {
  author: BlogAuthor;
  locale: BlogLocale;
}

export default function AuthorCard({ author, locale }: Props) {
  return (
    <div className="flex items-start gap-4 p-5 bg-surface rounded-2xl border border-gray-100">
      {author.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={author.photo}
          alt={author.name}
          className="w-14 h-14 rounded-full object-cover bg-white border border-gray-200 flex-shrink-0"
        />
      ) : (
        <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {author.name.charAt(0)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted mb-1">
          {locale === "ko" ? "글쓴이" : "Author"}
        </div>
        <div className="font-semibold text-foreground">{author.name}</div>
        {author.bio && (
          <p className="text-sm text-muted mt-1 leading-relaxed">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}
