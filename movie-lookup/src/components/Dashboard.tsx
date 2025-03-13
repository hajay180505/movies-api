import getTrending from "@/query/getTrending";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { useState } from "react";
import getMovieDetail from "@/query/getMovieDetail";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const [slug, setSlug] = useState("");
  const { data, refetch, error, isFetched } = useSuspenseQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  const {
    data: movie,
    refetch: movieRefetch,
    error: movieError,
  } = useQuery({
    queryKey: ["slug", slug],
    queryFn: () => getMovieDetail(slug),
    enabled: isFetched
  });

  console.log(movie)
  return (
    <>
      <div className="">
        <Button onClick={() => refetch()} className="border">
          {" "}
          Refetch trending
        </Button>
        {data && (
          <div className="w-[400px] border-2 border-black rounded-md flex justify-center items-center mx-auto">
            <Table>
              <TableCaption>A list of popular movies</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Movie name</TableHead>
                  <TableHead>Year of release</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map(({ _, movie }) => {
                  return (
                    <TableRow
                      onClick={() => {
                        console.log(movie.ids.slug);
                        setSlug(movie.ids.slug);
                      }}
                    >
                      <TableCell className="font-medium">
                        {movie.title}
                      </TableCell>
                      <TableCell>{movie.year}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="text-red-400">{error && error.message}</div>
          </div>
        )}
      </div>
      <div className="mt-3 rounded-md-border-sm flex justify-center items-center">
        <Card className="bg-slate-400  border-black w-[400px]">
          <CardHeader>
            <CardTitle>{movie?.data.title} - {movie?.data.year}</CardTitle>
            <CardDescription>{movie?.data.tagline}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{movie?.data.overview}</p>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Rating</TableCell>
                  <TableCell>{Math.round(movie?.data.rating)}/10</TableCell>
                  
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Languages</TableCell>
                  <TableCell>{movie?.data.languages}</TableCell>
                
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Status</TableCell>
                  <TableCell>{movie?.data.status}</TableCell>
                  
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Trailer</TableCell>
                  <TableCell>
                    <a href={movie?.data.trailer}>Click here</a>
                    
                    </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Homepage</TableCell>
                  <TableCell>
                  <a href={movie?.data.homepage}>Click here</a>
                    

                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Runtime</TableCell>
                  <TableCell>{movie?.data.runtime} minutes</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Generes</TableCell>
                  <TableCell>{movie?.data.genres}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Certification</TableCell>
                  <TableCell>{movie?.data.certification}</TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </CardContent>
         
        </Card>
      </div>
    </>
  );
};
export default Dashboard;
