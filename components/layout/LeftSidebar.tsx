import { Card, CardContent } from "@/components/ui/card";

export default function LeftSidebar() {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardContent className="p-4">
        <h2 className="font-semibold text-lg">Menu</h2>
        <ul className="mt-2 space-y-2">
          <li>Accueil</li>
          <li>Messages</li>
          <li>Amis</li>
          <li>Paramètres</li>
        </ul>
      </CardContent>
    </Card>
  );
}
