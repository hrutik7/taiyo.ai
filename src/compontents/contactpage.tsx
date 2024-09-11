import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../@/components/ui/alert";
import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../@/components/ui/radio";

const Contactpage = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [status, setStatus] = React.useState("active");

  const [contactList, setContactList] = React.useState<
    { id: Number; firstName: string; lastName: string; status: string }[]
  >([]); // Store the contact list in state

  const addContact = () => {
    setContactList((prevList) => [
      ...prevList,
      { id: contactList.length, firstName, lastName, status }, // Add the new contact to the previous list
    ]);
  };

  const editContact = (contactid: number) => {
    // Find the contact with the specified id
    const contactIndex = contactList.findIndex(
      (contact) => contact.id === contactid
    );

    // If the contact is found
    if (contactIndex !== -1) {
      // Create a copy of the contact list
      const updatedContactList = [...contactList];

      // Update the contact with the new values
      updatedContactList[contactIndex] = {
        id: contactid,
        firstName,
        lastName,
        status,
      };

      // Update the contact list state
      setContactList(updatedContactList);
    }
  };

  const deleteContact = (contactid: number) => {
    // Filter out the contact with the specified id
    const updatedContactList = contactList.filter(
      (contact) => contact.id !== contactid
    );

    // Update the contact list state
    setContactList(updatedContactList);
  };

  return (
    <div className="p-10   mt-10 justify-center w-[100%]">
      {contactList.length === 0 ? (
        <div className="  ">
          <div className="flex justify-center">
            <div className="py-3 hover:cursor-pointer font-normal flex justify-center w-[140px] px-5 h-12 text-white rounded-lg bg-gray-800">
              <AlertDialog>
                <AlertDialogTrigger>Add contact</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Save contact?</AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="flex flex-col">
                        <div className="">
                          <div>First Name</div>
                          <div>
                            <Input
                              type="text"
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <div>Last Name</div>
                          <div>
                            <Input
                              type="text"
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex gap-10">
                          <div className="text-lg text-black font-semibold">
                            Status
                          </div>

                          <div>
                            <RadioGroup
                              onValueChange={(e) => setStatus(e)}
                              defaultValue="active"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="active" id="active" />
                                <Label htmlFor="active">Active</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="Inactive"
                                  id="Inactive"
                                />
                                <Label htmlFor="Inactive">Inactive</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex justify-between">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        addContact();
                        console.log(contactList);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-red-100 flex mt-10 rounded-md w-[40%] py-2 px-7  h-20">
              <div className="mt-3">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    className="text-red-700"
                  ></path>
                </svg>
              </div>{" "}
              <div>
                {" "}
                <p className="ml-3 text-red-600">No contact found .</p>
                {/* <br /> */}
                <p className="ml-3 text-red-600">
                  Click on the add contact button to add a new contact
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          {
            <div className="">
              <div className="flex justify-center">
                <div className="py-3 hover:cursor-pointer font-normal flex justify-center w-[140px] px-5 h-12 text-white rounded-lg bg-gray-800">
                  <AlertDialog>
                    <AlertDialogTrigger>Add contact</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Save contact?</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className="flex flex-col">
                            <div className="">
                              <div>First Name</div>
                              <div>
                                <Input
                                  type="text"
                                  onChange={(e) => setFirstName(e.target.value)}
                                  placeholder=""
                                />
                              </div>
                            </div>

                            <div className="mt-4">
                              <div>Last Name</div>
                              <div>
                                <Input
                                  type="text"
                                  onChange={(e) => setLastName(e.target.value)}
                                  placeholder=""
                                />
                              </div>
                            </div>

                            <div className="mt-4 flex gap-10">
                              <div className="text-lg text-black font-semibold">
                                Status
                              </div>

                              <div>
                                <RadioGroup
                                  onValueChange={(e) => setStatus(e)}
                                  defaultValue="active"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="active"
                                      id="active"
                                    />
                                    <Label htmlFor="active">Active</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="Inactive"
                                      id="Inactive"
                                    />
                                    <Label htmlFor="Inactive">Inactive</Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="flex justify-between">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            addContact();
                            console.log(contactList);
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="grid mt-10 gap-5 grid-cols-3">
                {contactList.map((contact) => (
                  <div
                    className="border p-5 rounded-md"
                    key={contact?.id.toString()}
                  >
                    <div className="flex flex-col">
                      <div className="col">
                        <div className="text-gray-400 text-xl">
                          First Name:{" "}
                          <span className="text-gray-900">
                            {contact.firstName}
                          </span>
                        </div>
                        <div className="text-gray-400 text-xl">
                          Last Name:{" "}
                          <span className="text-gray-900">
                            {contact.lastName}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-400 text-lg">
                        Status:{" "}
                        <span className="text-gray-900">
                          {contact.status === "active" ? (
                            <span className="text-green-500">
                              {contact.status}
                            </span>
                          ) : (
                            <span className="text-red-500">
                              {contact.status}
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <div
                          onClick={() => {}}
                          className="bg-yellow-400 rounded-md w-7 p-1 h-7"
                        >
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  edit contact?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  <div className="flex flex-col">
                                    <div className="">
                                      <div>First Name</div>
                                      <div>
                                        <Input
                                          type="text"
                                          onChange={(e) =>
                                            setFirstName(e.target.value)
                                          }
                                          placeholder=""
                                        />
                                      </div>
                                    </div>

                                    <div className="mt-4">
                                      <div>Last Name</div>
                                      <div>
                                        <Input
                                          type="text"
                                          onChange={(e) =>
                                            setLastName(e.target.value)
                                          }
                                          placeholder=""
                                        />
                                      </div>
                                    </div>

                                    <div className="mt-4 flex gap-10">
                                      <div className="text-lg text-black font-semibold">
                                        Status
                                      </div>

                                      <div>
                                        <RadioGroup
                                          onValueChange={(e) => setStatus(e)}
                                          defaultValue="active"
                                        >
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                              value="active"
                                              id="active"
                                            />
                                            <Label htmlFor="active">
                                              Active
                                            </Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                              value="Inactive"
                                              id="Inactive"
                                            />
                                            <Label htmlFor="Inactive">
                                              Inactive
                                            </Label>
                                          </div>
                                        </RadioGroup>
                                      </div>
                                    </div>
                                  </div>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="flex justify-between">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    editContact(contact.id.valueOf());
                                    console.log(contactList);
                                  }}
                                >
                                  Continue
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>

                        <div
                          onClick={() => {
                            deleteContact(contact.id.valueOf());
                          }}
                          className="bg-red-400 rounded-full p-2"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default Contactpage;
