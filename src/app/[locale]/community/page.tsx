import { getTranslations, setRequestLocale } from "next-intl/server";
import { Heart, MessageCircle, Award, PenLine } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { SportIcon } from "@/components/shared/SportIcon";
import { feedPosts } from "@/data/sample-data";
import { getInitials } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("community");
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button>
          <PenLine className="h-4 w-4" />
          {t("post")}
        </Button>
      </div>

      <div className="space-y-6">
        {feedPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-xl border border-kn-blue-light/20 bg-card/60 p-6 hover:border-kn-orange/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarFallback>{getInitials(post.user.name)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold">{post.user.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {post.user.terminal}, {post.user.country}
                  </span>
                  <SportIcon sport={post.sport} size="sm" />
                </div>

                <p className="mt-3 text-foreground/90 leading-relaxed">{post.content}</p>

                {post.achievement && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-kn-orange/10 border border-kn-orange/20 px-3 py-1.5 text-sm font-medium text-kn-orange">
                    <Award className="h-4 w-4" />
                    {post.achievement}
                  </div>
                )}

                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-kn-blue-light/10">
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-kn-orange transition-colors">
                    <Heart className="h-4 w-4" />
                    {post.likes} {t("likes")}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-kn-orange transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments} {t("comments")}
                  </button>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}