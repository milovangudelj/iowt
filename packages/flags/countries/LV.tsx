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
        id="mask0_9_1019"
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
      <g mask="url(#mask0_9_1019)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 8H28V0H0V8Z"
          fill="#B9414B"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 20H28V12H0V20Z"
          fill="#B9414B"
        />
      </g>
    </svg>
  );
}
