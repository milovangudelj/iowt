export default function () {
  return (
    <svg
      width="28"
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.25"
        y="0.25"
        width="27.5"
        height="19.5"
        rx="1.75"
        fill="white"
        stroke="#F5F5F5"
        stroke-width="0.5"
      />
      <mask
        id="mask0_9_1404"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="20"
      >
        <rect
          x="0.25"
          y="0.25"
          width="27.5"
          height="19.5"
          rx="1.75"
          fill="white"
          stroke="white"
          stroke-width="0.5"
        />
      </mask>
      <g mask="url(#mask0_9_1404)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H28V4H0V0ZM0 8H28V12H0V8ZM0 16V20H28V16H0Z"
          fill="#FA2222"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0L13.3333 10L0 20V0Z"
          fill="#1D63F9"
        />
        <g filter="url(#filter0_d_9_1404)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.66665 11.2741L2.70736 12.6967L3.45492 10.3937L1.49646 8.96996L3.91776 8.96927L4.66665 6.66669L5.41553 8.96927L7.83683 8.96996L5.87837 10.3937L6.62593 12.6967L4.66665 11.2741Z"
            fill="url(#paint0_linear_9_1404)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_9_1404"
          x="1.49646"
          y="6.66669"
          width="6.34039"
          height="7.03003"
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
            result="effect1_dropShadow_9_1404"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9_1404"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_9_1404"
          x1="1.33331"
          y1="6.66669"
          x2="1.33331"
          y2="13.3334"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#F0F0F0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
