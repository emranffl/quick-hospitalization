module.exports = {
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	images: {
		domains: ["api.qrserver.com"],
	},
	// future: {
	//   webpack5: true,
	// },
	// distDir: "build",
	// trailingSlash: true,
}
