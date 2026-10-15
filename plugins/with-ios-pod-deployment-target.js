const { withPodfile } = require("@expo/config-plugins");

module.exports = function withIosPodDeploymentTarget(config) {
  return withPodfile(config, (config) => {
    const deploymentTarget = "15.1";
    const podfile = config.modResults.contents;

    const patch = `
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |build_config|
        build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${deploymentTarget}'
      end
    end
`;

    if (podfile.includes("IPHONEOS_DEPLOYMENT_TARGET")) {
      return config;
    }

    const postInstallIndex = podfile.indexOf("post_install do |installer|");

    if (postInstallIndex !== -1) {
      const endIndex = podfile.indexOf("\n  end", postInstallIndex);

      if (endIndex !== -1) {
        config.modResults.contents =
          podfile.slice(0, endIndex) + patch + podfile.slice(endIndex);
      }
    } else {
      config.modResults.contents = `${podfile}

post_install do |installer|
${patch}
end
`;
    }

    return config;
  });
};
