import { Card, CardContent } from "@/components/ui/card";

export default function RightSidebar() {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardContent className="p-4">
        <h2 className="font-semibold text-lg">Suggestions</h2>
        <ul className="mt-2 space-y-2">
          <li>Nouvel ami</li>
          <li>Groupes</li>
          <li>Événements</li>
        </ul>
      </CardContent>
    </Card>
  );
}
