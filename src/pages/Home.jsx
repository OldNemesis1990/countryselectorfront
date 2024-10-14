import React from "react";
import PageLayout from "../Layout/PageLayout";
import { Link } from "react-router-dom"

export default function Home() {
    return(
        <PageLayout>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 min-h-[calc(100vh-124px)]">
                <div className="">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/KQ6zr6kCPj8" title="LMFAO - Party Rock Anthem ft. Lauren Bennett, GoonRock" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
                <div className="flex flex-col items-center content-center justify-center text-gray-200 p-8">
                    <h1 className="mb-6 font-bold text-3xl">Emergency Broadcast: <span className="text-red-500">Shuffle Disease Outbreak</span></h1>
                    <p className="mb-6 ">Authorities have confirmed a sudden outbreak of the Shuffle Disease, a highly contagious illness spreading rapidly in affected areas. Symptoms include disorientation, involuntary movement, and extreme fatigue. The public is advised to stay indoors and avoid unnecessary travel. Health officials recommend wearing masks and maintaining social distance to reduce transmission risks. If you or someone you know exhibits symptoms, seek medical attention immediately. Emergency response teams are working around the clock to contain the situation.</p>

                    <p>Stay tuned for further updates, and view current statistics via the {<Link to="/toscope" className="font-bold text-lime-500">To Scope</Link>} or {<Link to="/creative" className="font-bold text-lime-500">Creative</Link>} links. Further news will be broadcasted as received. Stay safe.</p>
                </div>
            </div>
        </PageLayout>
    )
}

