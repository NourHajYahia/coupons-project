import logoImage from "../../../Assets/Images/logo.png";

function Logo(): JSX.Element {
   return (
      <div className="Logo">
         <img src={logoImage} alt="logo-coupon" style={{ height: 30 }} />
      </div>
   );
}

export default Logo;
