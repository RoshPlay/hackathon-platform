import { useState, useEffect, use } from "react";
import Layout from "../../../components/layout";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import BenefitsModule from "@/components/BenefitsModule";
import bitblockboom from "@/data/content/bitBlockBoom.json";
import sponsors from "@/data/content/sponsors.json";
import Sponsors from "@/components/Sponsors";
import { Check } from "lucide-react";
import PrizePool from "@/components/PrizePool";
import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import Image from "next/image";
import { useRouter } from "next/router";
import { match } from "assert";

export default function HackathonDetail() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [teams, setTeams] = useState([]);
  const [registration, setRegistration] = useState([])
  const [hackathon, setHackathon] = useState([])
  const [submit, setSubmit] = useState()
  const [prices, setPrices] = useState([])
  const signedUp = teams.length > 0;
  const [ruleList, setRuleList] = useState("");
  const [projects, setProject] = useState([])
  const [details, setDetails] = useState([])


  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id);
    }
  }, [router.isReady]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teams = await fetch(`/api/team/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (teams.ok) {
          const teamsData = await teams.json();
          setTeams(teamsData);
        } else {
          console.error("Error fetching teams:", teams.statusText);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams(); // Call the fetchTeams function
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  useEffect(() => {
    const fetchRegistrationHackathon = async () => {
      try {
        if (id) {
          const registration = await fetch(`/api/hackathonRegister/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });
          if (registration.ok) {
            const registrationData = await registration.json();
            setRegistration(registrationData);
          } else {
            console.error("Error fetching Registration Hackthon:", registration.statusText);
          }
        }
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };
    fetchRegistrationHackathon();
  }, [id]);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        if (id) {
          const data = await fetch(`/api/hackathons/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          })
          if (data.ok) {
            const response = await data.json()
            setHackathon(response)
            setPrices([["1st Place Prize", response.firstPlacePrize], ["2nd Place Prize", response.secondPlacePrize], ["3rd Place Prize", response.thirdPlacePrize]])
            setRuleList(response.rules)

          } else {
            console.error("Error fetching Registration Hackthon:", data.statusText);
          }
        }
      } catch (error) {
        console.error("Error fetching hackathon data", error)
      }
    }
    fetchHackathon()
  }, [id])

  useEffect(() => {
    const findTeam = (team, registration) => {
      let isMatching = false;
      for (const t2 of registration) {
        const matching = team.some((t1) => t1.id === t2.teamId);
        if (matching) {
          isMatching = true;
          break;
        }
      }
      setSubmit(isMatching);
    };

    findTeam(teams, registration);
  }, [teams, registration]);

  useEffect(() => {
    const fetchHackathonProjects = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/projects/${id}/hackathonDetails`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });
          const projectsData = await response.json();
          setProject(projectsData);
        }
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };
    fetchHackathonProjects();
  }, [id]);


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teams = await fetch(`/api/team/teams`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (teams.ok) {
          const teamsData = await teams.json();
          setDetails(teamsData);
        } else {
          console.error("Error fetching teams:", teams.statusText);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams(); // Call the fetchTeams function
  }, []);

  return (
    <Layout>
      <div className="py-4 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="px-6 lg:px-8 py-12 ">
            <div className="m-auto max-w-3xl py-16">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-500 via-purple-500 to-white text-transparent bg-clip-text h-20">
                  <div>{hackathon.title}</div>
                </h1>
                <p className="my-6 text-lg leading-8 text-gray-200">
                  {hackathon.description}
                </p>

                <div className="mt-2 flex items-center justify-center gap-x-6">
                  {(!signedUp || !submit) ? (
                    <ButtonPrimary
                      buttonText={"Register"}
                      buttonLink={`/hackathons/${id}/register`}
                    />
                  ) : (
                    <ButtonPrimary
                      buttonText={"Submit Project"}
                      buttonLink={`/hackathons/${id}/submit`}
                    />
                  )}
                  {
                  /* <ButtonPrimary
                    buttonText={"Register"}
                    buttonLink={`/hackathons/${id}/register`}
                  />
                  <ButtonPrimary
                    buttonText={"Submit Project"}
                    buttonLink={`/hackathons/${id}/submit`}
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 mb-8"></div>
          <div className="mx-auto max-w-4xl gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
            <div className="lg:pr-8 lg:pt-4">
              <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                {bitblockboom.headerText}
              </p>
              <p className="mt-6 text-lg leading-8 ">
                {bitblockboom.descriptionText}
              </p>
              <dl className="grid grid-cols-1 lg:grid-cols-3 my-10 text-base leading-7  lg:max-w-none ">

                <div className="relative pl-9 my-4">
                  <dt className=" font-semibold">
                    <Check className="absolute left-1 top-1 h-5 w-5 text-green-400" />
                    {hackathon.benefits}
                  </dt>
                </div>

              </dl>
            </div>
          </div>
          <div className="my-24">
            <SectionHeader headerText={"Rules"} descriptionText={""} />
            <ul className="text-xl list-disc ml-6">
              {ruleList.split("/N").map(rule => {
                return (
                  <li>
                    {rule}
                  </li>
                )
              })}
            </ul>
          </div>
          <PrizePool data={prices} />
          <div className="mt-24">
            <SectionHeader
              headerText={"Judging Criteria"}
              descriptionText={
                "The judges will evaluate your project submission using the following criteria."
              }
            />
            <ul className="text-xl list-disc ml-6">
              <li>{hackathon.judgingCriteria}</li>
            </ul>
          </div>
          <div className="mt-24">
            <SectionHeader
              headerText={"Teams and Projects"}
              descriptionText={
                "Teams with their projects already sign up and submitted"
              }
            />

            <div className="text-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {projects.map((project) => {
                return (
                  <>

                    <div class="">
                      <div class="w-full bg-gray-900 rounded-lg sahdow-lg p-5 flex flex-col justify-center items-center text-center">
                        <div>
                          {details.map(detail => {
                            return (
                              <>
                                {project.teamId === detail.id &&
                                  (
                                    <>
                                      <p class="text-base text-gray-400 font-normal">{detail.name}</p>
                                      <br></br>
                                      <div class="mb-8">
                                        <img class="object-center object-cover rounded-full h-32 w-32" src={detail.teamAvatar} alt="photo"></img>
                                      </div>
                                    </>
                                  )
                                }
                              </>
                            )
                          })}
                        </div>

                        <div class="text-center">
                          <p class="text-xl text-white font-bold mb-2"> {project.name}</p>
                          <p class="text-base text-gray-400 font-normal">{project.description}</p>


                        </div>
                      </div>
                    </div>



                  </>
                )
              })}
            </div>

          </div>
          <div className="py-24 sm:py-32">
            <div className="max-w-7xl">
              <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl ">
                Sponsors
              </h2>
              <div className="mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                {sponsors.data.map((item) => (
                  <Image
                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    alt={item[0]}
                    src={item[1]}
                    width={158}
                    height={48}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
