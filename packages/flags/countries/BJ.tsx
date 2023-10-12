export default function () {
  return (
    <svg
      width="28"
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="20" rx="2" fill="white" />
      <mask
        id="mask0_9_195"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="20"
      >
        <rect width="28" height="20" rx="2" fill="white" />
      </mask>
      <g mask="url(#mask0_9_195)">
        <g filter="url(#filter0_d_9_195)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 20H28V9.33333H0V20Z"
            fill="#F12641"
          />
        </g>
        <g filter="url(#filter1_d_9_195)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 9.33333H28V0H0V9.33333Z"
            fill="#FFD648"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 20H10.6667V0H0V20Z"
          fill="#17A668"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_9_195"
          x="0"
          y="9.33333"
          width="28"
          height="10.6667"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9_195"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9_195"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_9_195"
          x="0"
          y="0"
          width="28"
          height="9.33333"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9_195"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9_195"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
