'use client'

import React, { useState } from 'react'

const JobsComponent = ({ postData }: any) => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<any>(null);

    const openSidePanel = (job: any) => {
        setSelectedJob(job);
        setIsSidePanelOpen(true);
        document.body.style.overflow = 'hidden'; 
    };

    const closeSidePanel = () => {
        setIsSidePanelOpen(false);
        document.body.style.overflow = ''; 

    };

    return (
        <>
            <div className="elem1 elem1--box_layout elem1--box_layout_v3">
                <div className="container custom_container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_header section_header--centered">
                                <h2 className="section_header_title">So, what's your passion?</h2>
                                <p className="section_header_desc">Be a part of the team and culture that is inclusive &amp; transparent and make a difference to the world through your ideas, and determination to deliver something wonderful. Come, Join us and help our clients become the next and best versions of themselves.</p>
                            </div>
                            <div className="slider_1Column owl-carousel owl-theme overflow-hidden owl-loaded owl-drag __web-inspector-hide-shortcut__">
                                <div className="owl-height" style={{ height: "1157.89px" }}>
                                    <div className="owl-item cloned" style={{ width: "1296px", marginRight: "30px" }}>
                                        <div className="item">
                                            <div className='row'>
                                                {postData.map((item: any, index: number) => (
                                                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                                                        <div className="elem1__mainCont">
                                                            <div className="elem1__container bordered_box">
                                                                <div className="elem1__container_content">
                                                                    <div className="elem1__container_content_title careertitle js_sidePanel_clone_head">
                                                                        {item.jobtitle}
                                                                    </div>
                                                                    <div className="elem1__container_content_desc withicon">
                                                                        <span className="iconsection">
                                                                            <img src="/images/icons/experienceicon.svg" alt="experience icon" />
                                                                            <strong> Experience</strong>
                                                                        </span>
                                                                        <div className="text">{item.experience}</div>
                                                                    </div>
                                                                    <div className="elem1__container_content_desc withicon">
                                                                        <span className="iconsection">
                                                                            <img className="img-fluid" src="/images/icons/skillsicon.svg" alt="skills icon" />
                                                                            <strong>Skills</strong>
                                                                        </span>
                                                                        <div className="text">{item.skills}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="hovered_container">
                                                                <div className="js_sidePanel_clone_content d-none">
                                                                    <div className="content_box">
                                                                        <div className="content_info mt-4">
                                                                            <div className="content_info_data">
                                                                                <p><strong>Department : </strong> {item.department}</p>
                                                                                <p><strong>Job Location : </strong> {item.location}</p>
                                                                                <p><strong>Job Type : </strong> {item.jobtype}</p>
                                                                                <p><strong>Work From : </strong> {item.workfrom}</p>
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="content_info">
                                                                            <div className="content_info_title">Job Responsibilities</div>
                                                                            <div className="content_info_data">
                                                                                <ul>
                                                                                    {item.responsibities?.map((responsibility: string, i: number) => (
                                                                                        <li key={i}>{responsibility}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="content_info">
                                                                            <div className="content_info_title">Desired Profile</div>
                                                                            <div className="content_info_data">
                                                                                <ul>
                                                                                    {item.desiredprofile?.map((profile: string, i: number) => (
                                                                                        <li key={i}>{profile}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="content_info">
                                                                            <div className="content_info_title">EDUCATION</div>
                                                                            <div className="content_info_data">
                                                                                <ul>
                                                                                    <li>{item.education}</li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="button_group">
                                                                    <button onClick={() => openSidePanel(item)} className="button js_sidePanel">Know Your JD</button>
                                                                    <div className="line">|</div>
                                                                    <a href="mailto:hr@inspheresolutions.in" className="button">Apply Now</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
  <div className={`c-sidePanel ${isSidePanelOpen ? 'active' : ''}`}>
   <div className="js_sidePanel_close c-sidePanel__close" onClick={closeSidePanel}>
  
                            <i className= 'c-sidePanel__close i'></i>
                              </div>
                        <div className="c-sidePanel__head js_sidePanel_head">{selectedJob?.jobtitle}</div>
                        <div className="c-sidePanel__content">
                            <div className= 'c-sidePanel__content_info js_sidePanel_content'>
                            <div className="content_box">
                                <div className="content_info mt-4">
                                    <div className="content_info_data">
                                        <p><strong>Department : </strong> {selectedJob?.department}</p>
                                        <p><strong>Job Location : </strong> {selectedJob?.location}</p>
                                        <p><strong>Job Type : </strong> {selectedJob?.jobtype}</p>
                                        <p><strong>Work From : </strong> {selectedJob?.workfrom}</p>
                                    </div>
                                </div>
                                </div>
                                <hr />
                                <div className="content_info">
                                    <div className="content_info_title">Job Responsibilities</div>
                                    <div className="content_info_data">
                                        <ul>
                                            {selectedJob?.responsibities?.map((responsibility: string, i: number) => (
                                                <li key={i}>{responsibility}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="content_info">
                                    <div className="content_info_title">Desired Profile</div>
                                    <div className="content_info_data">
                                        <ul>
                                            {selectedJob?.desiredprofile?.map((profile: string, i: number) => (
                                                <li key={i}>{profile}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="content_info">
                                    <div className="content_info_title">EDUCATION</div>
                                    <div className="content_info_data">
                                        <ul>
                                            <li>{selectedJob?.education}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="c-sidePanel__btn">
                            <a href="mailto:hr@inspheresolutions.in" className="button apply_btn no-radius w100 button--purple">Apply Now</a>
                        </div>
                    </div>

          
        </>
    )
}

export default JobsComponent