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
        id="mask0_9_1045"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="20"
      >
        <rect width="28" height="20" rx="2" fill="white" />
      </mask>
      <g mask="url(#mask0_9_1045)">
        <rect width="28" height="20" fill="#86D7FF" />
        <g filter="url(#filter0_d_9_1045)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 2.66669L20 17.3334H8L14 2.66669Z"
            fill="white"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 5.33331L18.6666 17.3333H9.33331L14 5.33331Z"
          fill="#262626"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 9.33331L20 17.3333H8L14 9.33331Z"
          fill="#FFDA57"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_9_1045"
          x="8"
          y="2.66669"
          width="12"
          height="15.6667"
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
          <feOffset dy="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9_1045"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9_1045"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
