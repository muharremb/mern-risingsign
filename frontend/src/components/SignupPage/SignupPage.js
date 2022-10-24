import DisclaimerPage from "./DisclaimerPage/DisclaimerPage";
import SignupModePage from "./SignupModePage/SignupModePage";
import SetBirthdayPage from "./SetBirthdayPage/SetBirthdayPage";
import SetFirstNamePage from "./SetFirstNamePage/SetFirstNamePage";
import SetGenderPage from "./SetGenderPage/SetGenderPage";
import SetPhoneNumberPage from "./SetPhoneNumberPage/SetPhoneNumberPage";
import SetSexPrefPage from "./SetSexPrefPage/SetSexPrefPage";
import SetUserVisibilityPage from "./SetUserVisibilityPage/SetUserVisibilityPage";
import UserBuild from "./UserBuild/UserBuild";
import ContinueButton from "./ContinueButton/ContinueButton";

const SignupPage = () => {
   return (
      <div className="signup-page">
         <SignupModePage />
         <SetPhoneNumberPage />
         <DisclaimerPage />
         <SetFirstNamePage />
         <SetBirthdayPage />
         <SetGenderPage />
         <SetSexPrefPage />
         <SetUserVisibilityPage />

         <UserBuild />
         <ContinueButton />
      </div>
   )
}