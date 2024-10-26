import React, { useState } from "react";
import Header from "../components/Header";
import SidebarHeader from "../components/sidebarHeader";
import { useMediaQuery } from "react-responsive";
import Footer from "../components/Footer";
import "../components/styless.css"
import UserLayout from "../UserLayout";

const TermsCondition = () => {
    // const isDesktopOrLaptop = useMediaQuery({
    //     query: "(min-width: 985px)",
    // });
   
      
    
    return (
        <UserLayout>
        <div>
            <div className=" text-black mx-[10%] my-[80px]" >
                <p className="text-[32px]  font-[800]  mb-10">Term & Conditions</p>
                <p className="my-6">We at Advance Ai Tools consider your privacy as a significant concern. Our Privacy Policy covers the collection, use, disclosure, transfer, and storage of your information and customized user data. We hope that our policy is simple and easily understandable. However, if you do not accept the terms mentioned in the policy, we would not be able to provide our services to you.</p>
                <p className="my-6">
                    Please take a few minutes to go through our privacy practices mentioned below. By using the Advance Ai Tools Service, which includes websites, mobile applications, or any other service, you acknowledge and agree that you have consented to the collection, use, disclosure, transfer, and storage practices set out in this Privacy Policy. If you are under 18 years of age, you should read these terms under the guidance of your parent or legal guardian. You should use Advance Ai Tools only after your guardian agrees to these terms.
                </p>

                <ol className="list-decimal text-black ">
                    <li className="text-[26px] font-[600] my-4 ml-6">Definition</li>

                    <ol className=" text-black ml-6 flex flex-col gap-3">
                        <li>
                            <span className="font-[600] text-[16px] mr-3">1.1</span> "Advance Ai Tools" refers to Chengdu Everimaging Science & Technology Co., Ltd., the legal entity that develops and provides Advance Ai Tools products and services, and is referred to as "Advance Ai Tools," "we," "us," or "our."
                        </li>
                        <li>
                        <span className="font-[600] text-[16px] mr-3">1.2 </span>1.2 "Personal Information" refers to all kinds of information recorded by electronic or other means that can identify the identity of a specific individual or reflect the activities of a specific individual independently or in combination with other information.
                        </li>
                        <li>
                        <span className="font-[600] text-[16px] mr-3">1.3</span> "Non-Personal Information" refers to processed anonymous user information that cannot identify specific individuals and cannot be recovered, such as data that does not allow direct association with any specific individual.

                        </li>
                        <li>
                        <span className="font-[600] text-[16px] mr-3">1.4 </span>"Cookie" refers to a small data file that is stored on your device. Most Internet browsers automatically accept cookies. We use information collected from cookies to improve users' experience and the overall quality of our service.
                        </li>
                        <li>
                        <span className="font-[600] text-[16px] mr-3">1.5</span> "Clear GIFs" (also known as "Web Beacons") are used in combination with Cookies to help service operators understand how visitors interact with their service. The use of a Clear GIF allows the service provider to measure the actions of the visitor, such as opening a page that contains the Clear GIF.
                        </li>
                        <li>
                        <span className="font-[600] text-[16px] mr-3">1.5</span> "Face Data" collectively refers to (1) "input": the original photos, selfies, and a specified gender that you submit to Service for the purpose of creating AI Avatars, and (2) "outcome": the avatars created through AI technology based on your face likeness. Face Data is a specific category of Personal Information.

                        </li>
                    </ol>

                    {/* 2 */}
                    <li className="text-[26px] font-[600] my-4 ml-6">Our Policy on Non-Personal Information</li>
                    <p>We may collect Non-Personal Information as well. Non-personal data is collected, used, transferred, disclosed, and stored for several purposes, including the use of cookies and other technologies that give us a better understanding of our users' needs.</p>
                    <ol className="ml-6 flex flex-col gap-3">
                        <li className="font-[600] text-[16px]">
                        <span className="mr-3">2.1</span> Cookies
                        </li>
                        <ol className="ml-10 flex flex-col gap-5">
                            <li>
                            <span className="font-[600] text-[16px] mr-3">2.1.1</span>  We generally use Cookies for the following purposes: (1) to allow registered users to stay logged in to the service after they close their browser window; (2) to store users' preferences for Service functionality; (3) to track Service usage so we can improve our service and better understand how people are using it; and (4) to better understand the interests of our customers and our Service visitors.
                            </li>
                            <li>
                            <span className="font-[600] text-[16px] mr-3">2.1.2</span>  Some Cookies are necessary for certain uses of the Service, and without such Cookies, we would not be able to provide many features that you need to use the Service properly. These Cookies allow us to operate our Service so that you can access it as you have requested, recognize that you have created an account and have logged into that account to access Service content, and remember your previous actions within the same browsing session and secure our Services.
                            </li>
                            <li>
                            <span className="font-[600] text-[16px] mr-3">2.1.3</span>  We also use functional Cookies and/or Cookies from third parties for analysis and marketing purposes. Functional Cookies enable certain parts of the Service to work correctly and let your User preferences remain known. Analysis Cookies collect information on how visitors use our Service, the content and products that users view most frequently, and the effectiveness of our third-party advertising. Advertising Cookies assist in delivering ads to relevant audiences and having our ads appear at the top of search results. Cookies are either "session" Cookies that are deleted when you end your browser session or "persistent," which remain until their deletion by you (discussed below) or the party that served the cookie.
                            </li>
                            <li>
                            <span className="font-[600] text-[16px] mr-3">2.1.4</span>  You can generally activate or deactivate the use of Cookies through a functionality built into your web browser. In addition, certain third-party advertising networks, including Google, permit users to opt-out of or customize preferences associated with your internet browsing.
                            </li>
                            <li>
                            <span className="font-[600] text-[16px] mr-3">2.1.5</span>  We may link the information collected by Cookies with other information we collect from you pursuant to this Privacy Policy and use the combined information as set forth herein.
                            </li>
                            <li>
                            <span className="font-[600] text-[16px] mr-3">2.1.6</span>  You may configure your browser or device to block Cookies, including third-party cookies, but if you do so, some of the Service's features may not work correctly.
                            </li>
                        </ol>
                        <li className="font-[600] text-[16px] "> <span className="mr-3">2.2</span> Clear GIFs</li>
                        <p>We may use third-party advertising companies to display ads when you visit our service. To provide ads about goods and services that interest you, these companies may use Non-Personal Information related to your visits to our Service and other websites. Additionally, these companies may use Clear GIFs, along with Cookies, to determine the effectiveness of advertising. The information collected by these third-party companies through Clear GIFs is generally not personally identifiable unless you provide them with personally identifiable information through an ad or email message. We encourage you to read the privacy policy of these businesses if you have any concerns about how they will handle your personal information. You can also visit the Network Advertising Initiative’s consumer website to learn more about this practice and your choices regarding the use of this information by these companies.
                        </p>
                        <li className="font-[600] text-[16px] "> <span className="mr-3">2.3</span> Device Information or System Information
                        </li>
                        <ol className="ml-10 flex flex-col gap-3">
                            <li className="">
                            <span className="font-[600] text-[16px] mr-3">2.3.1</span>  If you visit our Service through a website or mobile application, we will receive and record the device-related information you use, such as device type, operating system version, device settings, device identifier, time zone, language, software version number, and browser unique identifier. We will collect this information based on specific permissions you grant during software installation and use.
                            </li>
                            <li>
                            <span className="font-[600] text-[16px] mr-3">2.3.2</span> The purposes of collecting Device Information or System Information include identifying the user’s usage habits, automatically matching the user’s system language, deciding on service adaptation to older devices or systems, helping developers locate errors in the software, and improving website access speed.
                            </li>
                        </ol>

                        <li className="font-[600] text-[16px]" >
                          <span className="mr-3 ">  2.4</span> Log Data
                        </li>
                        <p>We may save information about your registration or log in Advance Ai Tools. We may automatically record certain information about how you use our Service, which we refer to as “Log Data.” Log Data may include information such as your Internet Protocol (IP) address, date and time of login/logout. We use this information to administer and provide access to the Service. Such information will be under the control of Advance Ai Tools, and we will protect it through both technical and administrative means to prevent the risk of loss, improper use, unauthorized access, disclosure or changes.
                        </p>

                    </ol>
                    <li className="text-[26px] font-[600] my-4 ml-6">Our Policy on Personal Information (General)</li>
                    <ol className="ml-6 flex flex-col gap-3">
                        <li className="font-[600] text-[16px]"><span className=" mr-3">  3.1</span> Collection</li>
                        <p>When you use certain Advance Ai Tools Services, we may require you to provide Personal Information. Personal Information may be collected in various ways. Typically, we may prompt you to provide Personal Information that is necessary for performing a particular Service.
                        </p>
                        <li className="font-[600] text-[16px]"><span className=" mr-3">  3.2</span> Storage</li>
                        <p>As permitted by applicable laws, we encrypt and securely store your Personal Information in the location where Advance Ai Tools is based.
                        </p>
                        <li className="font-[600] text-[16px]"> <span className=" mr-3">  3.3</span> Use</li>
                        <ol className="ml-10 flex flex-col gap-5">
                            <li> <span className="font-[600] text-[16px] mr-3">3.3.1</span> If you use Advance Ai Tools as a platform to sell or buy a license for copyrighted works or to participate in an artwork competition, we may require your personal information to identify you as the source of the artistic work, in compliance with applicable laws.
                            </li>
                            <li><span className="font-[600] text-[16px] mr-3">3.3.2</span> If you require us to contact you through a specific means of communication, you need to provide your account identifier, name, address/zip code, telephone number, or email, according to the means of communication you have specified.
                            </li>
                            <li>
                            <span className="font-[600] text-[16px] mr-3">3.3.3</span> If you agree to participate in our market research activities to provide better Service for you and other users in the future, you may need to provide additional information such as your gender, age, nature of your organization, etc. that is necessary for the market research.
                            </li>
                            <li>
                            <span className="font-[600] text-[16px] mr-3">3.3.4</span> When you use our customer support service, we collect your correspondence to build a public knowledge base that will be available to all Service users. Your correspondence will most likely not be used verbatim, but paraphrased in FAQ format.
                            </li>
                            <li>
                            <span className="font-[600] text-[16px] mr-3">3.3.5</span> If any other Service requires your Personal Information, Advance Ai Tools will use it with your prior consent.
                            </li>

                        </ol>
                        <li className="font-[600] text-[16px]"><span className=" mr-3">  3.4</span> Transfer</li>
                        <p>In general, Advance Ai Tools will not transfer your Personal Information to any third party. However, as permitted by applicable laws, such information, as a whole, may be inherited, transferred, or taken over by Advance Ai Tools’s legal successor in a merger, acquisition, or sale of the company and/or its assets, as well as in the event of insolvency, bankruptcy or receivership.</p>
                        <li className="font-[600] text-[16px]"><span className=" mr-3">  3.5</span> Deletion</li>
                        <ol className="ml-10 flex flex-col gap-5">
                            <li>
                            <span className="font-[600] text-[16px] mr-3">3.5.1</span> You can request us to delete your Personal Information, except in the following circumstances: 1) your account has been identified to commit illegal activities; 2) there are completed or ongoing transactions of copyright licensing in your account; 3) your account has outstanding debts or unresolved disputes; 4) Advance Ai Tools is required to keep your Personal Information according to relevant laws and regulations or the requirements of judicial or administrative authorities.
                            </li>
                            <li>
                            <span className="font-[600] text-[16px] mr-3">3.4.2</span> You can delete your Personal Information by contacting support@Advance Ai Tools.com. Please note that we will delete your Personal Information within the period required by applicable laws and regulations.
                            </li>

                        </ol>
                    </ol>
                    <li className="text-[26px] font-[600] my-4 ml-6">Contact</li>
                </ol>


                <p>If you have any questions about this Privacy Policy, please send us an email at support@Advance Ai Tools.com.</p>


            </div>
        </div>
        </UserLayout>
    );
};

export default TermsCondition;
