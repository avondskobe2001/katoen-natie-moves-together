import { Heart, MessageCircle, Award } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SportIcon } from "@/components/shared/SportIcon";
import type { FeedPost } from "@/types";
import { getInitials } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface FeedPreviewProps {
  posts: FeedPost[];
}

export function FeedPreview({ posts }: FeedPreviewProps) {
  return (
    <div className="space-y-3">
      {posts.slice(0, 4).map((post) => (
        <div
          key={post.id}
          className="rounded-xl border border-border bg-white p-4 hover:shadow-sm transition-all"
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className="text-xs">{getInitials(post.user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">{post.user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {post.user.terminal}, {post.user.country}
                </span>
                <SportIcon sport={post.sport} size="sm" />
              </div>
              <p className="text-sm mt-2 text-foreground/80 leading-relaxed">{post.content}</p>
              {post.achievement && (
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-kn-orange/10 border border-kn-orange/15 px-2.5 py-1 text-xs font-medium text-kn-orange">
                  <Award className="h-3 w-3" />
                  {post.achievement}
                </div>
              )}
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
                </span>
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}