'use client'
import { Card, CardContent } from "@/components/ui/card";
import Stories from "../sections/Stories";
import FeedPosts from "../sections/FeedPosts";
import UsersSugg from "../sections/UsersSugg";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function MainFeed() {
  const { isMobile } = useIsMobile();
  return (
    <Card className="shadow-md rounded-2xl h-full overflow-y-auto">
      <CardContent className="px-2 pt-0 space-y-4">
        <Stories />
        {isMobile &&(<UsersSugg />)}
        <FeedPosts />
      </CardContent>
    </Card>
  );
}
