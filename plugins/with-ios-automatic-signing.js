/*
const { withXcodeProject, IOSConfig } = require("@expo/config-plugins");

module.exports = function withIosAutomaticSigning(config) {
  return withXcodeProject(config, (config) => {
    const project = config.modResults;
    const targets = IOSConfig.Target.findSignableTargets(project);

    for (const [targetId, target] of targets) {
      const configurations =
        IOSConfig.XcodeUtils.getBuildConfigurationsForListId(
          project,
          target.buildConfigurationList,
        );

      for (const [, buildConfiguration] of configurations) {
        buildConfiguration.buildSettings.CODE_SIGN_STYLE = "Automatic";
        buildConfiguration.buildSettings.DEVELOPMENT_TEAM =
          config.ios?.appleTeamId;
      }

      const projectSection = IOSConfig.XcodeUtils.getProjectSection(project);

      for (const [, projectObject] of Object.entries(projectSection)) {
        if (!projectObject.TargetAttributes) {
          projectObject.TargetAttributes = {};
        }

        if (!projectObject.TargetAttributes[targetId]) {
          projectObject.TargetAttributes[targetId] = {};
        }

        projectObject.TargetAttributes[targetId].ProvisioningStyle =
          "Automatic";
        projectObject.TargetAttributes[targetId].DevelopmentTeam =
          config.ios?.appleTeamId;
      }
    }

    return config;
  });
};
*/
/* work copy
const { withXcodeProject } = require("@expo/config-plugins");

module.exports = function withIosAutomaticSigning(config) {
  return withXcodeProject(config, (config) => {
    const project = config.modResults;
    const teamId = config.ios?.appleTeamId;

    const configurations = project.pbxXCBuildConfigurationSection();

    for (const key of Object.keys(configurations)) {
      const configuration = configurations[key];

      if (!configuration || typeof configuration !== "object") {
        continue;
      }

      if (!configuration.buildSettings) {
        configuration.buildSettings = {};
      }

      configuration.buildSettings.CODE_SIGN_STYLE = "Automatic";
      configuration.buildSettings.DEVELOPMENT_TEAM = teamId;
    }

    return config;
  });
};*/

const { withXcodeProject } = require("@expo/config-plugins");

module.exports = function withIosAutomaticSigning(config) {
  return withXcodeProject(config, (config) => {
    const project = config.modResults;
    const teamId = config.ios?.appleTeamId;

    if (!teamId) {
      throw new Error("expo.ios.appleTeamId is required");
    }

    const buildConfigurations = project.pbxXCBuildConfigurationSection();

    for (const key of Object.keys(buildConfigurations)) {
      const configuration = buildConfigurations[key];

      if (
        !configuration ||
        typeof configuration !== "object" ||
        !configuration.buildSettings
      ) {
        continue;
      }

      configuration.buildSettings["CODE_SIGN_STYLE"] = "Automatic";
      //   configuration.buildSettings["DEVELOPMENT_TEAM"] = teamId;
    }

    return config;
  });
};
