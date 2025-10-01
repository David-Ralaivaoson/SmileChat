import { Card, CardContent } from "@/components/ui/card";
import Stories from "../sections/Stories";
import FeedPosts from "../sections/FeedPosts";

export default function MainFeed() {
  return (
    <Card className="shadow-md rounded-2xl h-full overflow-y-auto">
      <CardContent className="px-2 pt-0 space-y-4">
        <Stories />
        <FeedPosts />
      </CardContent>
    </Card>
  );
}
