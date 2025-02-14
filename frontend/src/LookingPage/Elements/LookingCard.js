import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function LookingCard({ data }) {
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <div className="flex items-center justify-center p-5">
          <img src={data.image.url} alt="imagica" className="h-50 w-50"></img>
        </div>

        <div className="flex items-center justify-center">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {data.name}
          </Typography>
        </div>

        <Typography>
          <div className="flex justify-center items-center">
            <ul className="p-2">
              {data.tournamentname && (
                <li>
                  <strong className="underline">TournamentName:</strong> {data.tournamentname}
                </li>
              )}
              {data.matcheson && (
                <li>
                  <strong className="underline">MatchsOn:</strong>
                  <ul className="list-disc">
                    {data.matcheson.map((match, index) => (
                      <li key={index}>{match}</li>
                    ))}
                  </ul>
                </li>
              )}

              {data.role && (
                <li>
                  <strong className="underline">Role:</strong> {data.role}
                </li>
              )}
              <li>
                <strong className="underline">Address:</strong> {data.address}
              </li>
              <li>
                <strong className="underline">City:</strong> {data.city}
              </li>
              {data.date && (
                <li>
                  <strong className="underline">Date:</strong> {data.date}
                </li>
              )}
              {data.time && (
                <li>
                  <strong className="underline">Time:</strong> {data.time}
                </li>
              )}
              <li>
                <strong className="underline">Contact:</strong> {data.contact}
              </li>
            </ul>
          </div>
        </Typography>
      </CardBody>
    </Card>
  );
}
