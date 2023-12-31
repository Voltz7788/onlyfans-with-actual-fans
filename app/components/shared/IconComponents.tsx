import React from "react";

type SVGProps = {
  className?: string;
};

export const FanIcon = ({ className }: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="900"
      height="900"
      fill="rgb(56 189 248)"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M233,135a60,60,0,0,0-89.62-35.45l16.39-65.44a8,8,0,0,0-3.45-8.68A60,60,0,1,0,95.69,128.91L30.82,147.44a8,8,0,0,0-5.8,7.32,60,60,0,0,0,44.42,60.66,60.52,60.52,0,0,0,15.62,2.07,60.07,60.07,0,0,0,59.88-62l48.48,46.92a8,8,0,0,0,9.25,1.35A60,60,0,0,0,233,135ZM130.44,147.85a20,20,0,1,1,17.41-22.29A20,20,0,0,1,130.44,147.85Z"></path>
    </svg>
  );
};

export const TwitterIcon = ({ className }: SVGProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>twitter-logo</title>
      <g fill="none">
        <path
          d="M170.2264 442.7654c162.2648 0 251.0168-140.0367 251.0168-261.4758 0-3.9775 0-7.9371-.258-11.8788 17.2659-13.009 32.1701-29.1167 44.0148-47.5687-16.1013 7.4318-33.1817 12.3057-50.6712 14.4587 18.4168-11.4849 32.2005-29.5486 38.786-50.8295-17.3177 10.7044-36.2637 18.2483-56.0204 22.3062-27.3466-30.29-70.8-37.7036-105.9942-18.0837-35.194 19.62-53.3763 61.3941-44.351 101.8979-70.9346-3.7043-137.0242-38.6047-181.8212-96.0154-23.4157 41.9903-11.4554 95.7083 27.3136 122.6754-14.0397-.4335-27.7732-4.3786-40.0416-11.5025v1.1646c.0115 43.7452 29.6141 81.4229 70.778 90.085-12.9882 3.6897-26.6156 4.229-39.8352 1.5766 11.5575 37.4355 44.6783 63.0807 82.4224 63.8192-31.2398 25.5748-69.831 39.4584-109.564 39.4166A172.495 172.495 0 0 1 35 401.4854c40.345 26.9696 87.2885 41.275 135.2264 41.2083"
          fill="#ffffff"
        />
        <path d="M35 35h430v430H35z" />
      </g>
    </svg>
  );
};

export const GoogleIcon = ({ className }: SVGProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
};

export const GithubLogo = ({ className }: SVGProps) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="240.000000pt"
      height="240.000000pt"
      viewBox="0 0 240.000000 240.000000"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g
        transform="translate(0.000000,240.000000) scale(0.100000,-0.100000)"
        fill="#ffffff"
        stroke="none"
      >
        <path
          d="M970 2301 c-305 -68 -555 -237 -727 -493 -301 -451 -241 -1056 143
 -1442 115 -116 290 -228 422 -271 49 -16 55 -16 77 -1 24 16 25 20 25 135 l0
 118 -88 -5 c-103 -5 -183 13 -231 54 -17 14 -50 62 -73 106 -38 74 -66 108
 -144 177 -26 23 -27 24 -9 37 43 32 130 1 185 -65 96 -117 133 -148 188 -160
 49 -10 94 -6 162 14 9 3 21 24 27 48 6 23 22 58 35 77 l24 35 -81 16 c-170 35
 -275 96 -344 200 -64 96 -85 179 -86 334 0 146 16 206 79 288 28 36 31 47 23
 68 -15 36 -11 188 5 234 13 34 20 40 47 43 45 5 129 -24 214 -72 l73 -42 64
 15 c91 21 364 20 446 0 l62 -16 58 35 c77 46 175 82 224 82 39 0 39 -1 55 -52
 17 -59 20 -166 5 -217 -8 -30 -6 -39 16 -68 109 -144 121 -383 29 -579 -62
 -129 -193 -219 -369 -252 l-84 -16 31 -55 32 -56 3 -223 4 -223 25 -16 c23
 -15 28 -15 76 2 80 27 217 101 292 158 446 334 590 933 343 1431 -145 293
 -419 518 -733 602 -137 36 -395 44 -525 15z"
        />
      </g>
    </svg>
  );
};
