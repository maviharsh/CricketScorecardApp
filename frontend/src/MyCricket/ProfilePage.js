import React, { useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useState } from "react";

export default function PersonalProfile() {
  const [profileData, setProfileData] = useState({});
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user`,
          { withCredentials: true }
        );
        setProfileData(response.data); // Set response directly
        setFlag(true);
      } catch (err) {
        console.error("The error is", err.response?.data || err);
        setFlag(false);
      }
    };

    fetchUser();
  }, []);

  if (flag) {
    return (
      <section style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-96 mb-5">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <div className="flex flex-col justify-center items-center">
                      {profileData?.image?.url && (
                        <MDBCardImage
                          src={profileData.image.url}
                          alt="Avatar"
                          className="my-5 h-24 w-24 rounded-full"
                          style={{ width: "80px" }}
                          fluid
                        />
                      )}
                      <MDBTypography tag="h5">{profileData?.name}</MDBTypography>
                    </div>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Role</MDBTypography>
                          <MDBCardText className="text-muted">
                            {profileData?.role}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">D.O.B</MDBTypography>
                          <MDBCardText className="text-muted">
                            {profileData?.dob}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {profileData?.email}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">
                            {profileData?.contact}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  } else {
    return (
      <section style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-96 mb-5">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="12"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <MDBCardImage
                        src={
                          "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        }
                        alt="Avatar"
                        className="my-5"
                        style={{ width: "80px" }}
                        fluid
                      />
                      USER NOT FOUND
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
