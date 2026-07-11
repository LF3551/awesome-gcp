# Awesome GCP [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of awesome tools, libraries, and resources for [Google Cloud Platform](https://cloud.google.com).

Google Cloud Platform (GCP) is a suite of cloud computing services running on the same infrastructure that Google uses internally. This list gathers the best official tooling, community projects, and learning material to help engineers build, secure, and operate workloads on Google Cloud.

The original [GoogleCloudPlatform/awesome-google-cloud](https://github.com/GoogleCloudPlatform/awesome-google-cloud) list has been archived since 2024 — this list picks up where it left off, kept current and community-driven.

## Contents

- [Official Tools & SDKs](#official-tools--sdks)
- [Infrastructure as Code](#infrastructure-as-code)
- [Kubernetes & GKE](#kubernetes--gke)
- [Security & IAM](#security--iam)
- [Observability](#observability)
- [Data & AI](#data--ai)
- [Cost & FinOps](#cost--finops)
- [Architecture & Decision Tools](#architecture--decision-tools)
- [Learning & Certification](#learning--certification)
- [Community & Reference](#community--reference)
- [Blogs & Newsletters](#blogs--newsletters)
- [Contributing](#contributing)

## Official Tools & SDKs

- [Google Cloud CLI (gcloud)](https://cloud.google.com/sdk/gcloud) - Command-line tool for creating and managing Google Cloud resources.
- [Google Cloud SDK](https://cloud.google.com/sdk) - Downloadable toolkit bundling gcloud, gsutil, and bq for interacting with Google Cloud.
- [Cloud Code](https://cloud.google.com/code) - IDE extensions for VS Code and IntelliJ to write, debug, and deploy cloud-native apps.
- [Cloud Code for VS Code](https://cloud.google.com/code/docs/vscode) - VS Code extension for developing Kubernetes and Cloud Run applications on Google Cloud.
- [Cloud Code for IntelliJ](https://cloud.google.com/code/docs/intellij) - IntelliJ plugin for building and deploying cloud-native applications to Google Cloud.
- [Cloud Shell](https://cloud.google.com/shell) - Browser-based shell environment preloaded with the gcloud CLI and common tools.
- [Cloud Build](https://cloud.google.com/build/docs) - Managed CI/CD service that executes builds on Google Cloud infrastructure.
- [Artifact Registry](https://cloud.google.com/artifact-registry/docs) - Managed repository service for container images and language packages.
- [Skaffold](https://skaffold.dev) - Command-line tool that automates the build, push, and deploy loop for Kubernetes applications.
- [Google Cloud Console](https://console.cloud.google.com) - Web-based interface for managing Google Cloud projects and resources.
- [gcloud alpha/beta reference](https://cloud.google.com/sdk/gcloud/reference/alpha) - Reference for pre-GA gcloud command groups covering early-access features.

## Infrastructure as Code

- [Terraform Google Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs) - Official Terraform provider for provisioning Google Cloud resources.
- [Cloud Foundation Toolkit](https://cloud.google.com/docs/terraform/blueprints/terraform-blueprints) - Collection of reference Terraform modules and blueprints for Google Cloud.
- [Cloud Foundation Toolkit (GitHub)](https://github.com/GoogleCloudPlatform/cloud-foundation-toolkit) - Source repository for the Cloud Foundation Toolkit CLI and templates.
- [Config Connector](https://cloud.google.com/config-connector/docs/overview) - Kubernetes addon that manages Google Cloud resources through Kubernetes manifests.
- [Pulumi Google Cloud Provider](https://www.pulumi.com/registry/packages/gcp/) - Infrastructure-as-code provider for managing Google Cloud using general-purpose languages.
- [Crossplane GCP Provider](https://github.com/crossplane-contrib/provider-upjet-gcp) - Crossplane provider for provisioning Google Cloud resources via Kubernetes APIs.
- [Deployment Manager](https://cloud.google.com/deployment-manager/docs) - Google's native templated deployment service (deprecated; prefer Terraform or Config Connector).

## Kubernetes & GKE

- [GKE Documentation](https://cloud.google.com/kubernetes-engine/docs) - Official documentation for Google Kubernetes Engine.
- [GKE Autopilot](https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview) - Fully managed GKE mode where Google provisions and manages the cluster infrastructure.
- [Backup for GKE](https://cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/backup-for-gke) - Managed service for backing up and restoring GKE workloads and their data.
- [gke-gcloud-auth-plugin](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl) - Authentication plugin required for kubectl to connect to GKE clusters.
- [Config Sync](https://cloud.google.com/kubernetes-engine/enterprise/config-sync/docs/overview) - GitOps tool that syncs cluster configuration from a Git source of truth.
- [kubectl](https://kubernetes.io/docs/reference/kubectl/) - Command-line tool for running commands against Kubernetes clusters.
- [kubectx + kubens](https://github.com/ahmetb/kubectx) - Utilities for fast switching between Kubernetes contexts and namespaces.
- [k9s](https://github.com/derailed/k9s) - Terminal UI for interacting with and observing Kubernetes clusters.

## Security & IAM

- [Security Command Center](https://cloud.google.com/security-command-center/docs) - Centralized security and risk management platform for Google Cloud.
- [gcpdiag](https://github.com/GoogleCloudPlatform/gcpdiag) - Command-line diagnostics tool that finds common issues in Google Cloud projects.
- [Policy Analyzer](https://cloud.google.com/policy-intelligence/docs/policy-analyzer-overview) - Tool for finding which principals have access to which resources.
- [IAM Recommender](https://cloud.google.com/iam/docs/recommender-overview) - Uses machine learning to suggest removal of excess IAM permissions.
- [Cloud Asset Inventory](https://cloud.google.com/asset-inventory/docs) - Service providing inventory and history of Google Cloud resources and IAM policies.
- [Binary Authorization](https://cloud.google.com/binary-authorization/docs) - Deploy-time control that ensures only trusted container images run on GKE and Cloud Run.
- [Cloud Armor](https://cloud.google.com/armor/docs) - DDoS protection and web application firewall for Google Cloud load balancers.
- [Google SecOps (Chronicle)](https://cloud.google.com/chronicle/docs/secops/secops-overview) - Cloud-native SIEM and security operations platform for threat detection and response.
- [CIS Google Cloud Benchmarks](https://www.cisecurity.org/benchmark/google_cloud_computing_platform) - Consensus-based security configuration guidelines for Google Cloud.
- [Scout Suite](https://github.com/nccgroup/ScoutSuite) - Open-source multi-cloud security-auditing tool that assesses cloud posture, including GCP.
- [Prowler](https://github.com/prowler-cloud/prowler) - Open-source cloud security tool with GCP checks across multiple compliance frameworks.

## Observability

- [Cloud Monitoring](https://cloud.google.com/monitoring/docs) - Collects metrics, uptime checks, and alerts for Google Cloud and hybrid workloads.
- [Cloud Logging](https://cloud.google.com/logging/docs) - Managed service for storing, searching, and analyzing logs.
- [Cloud Trace](https://cloud.google.com/trace/docs) - Distributed tracing system that collects latency data from applications.
- [Cloud Profiler](https://cloud.google.com/profiler/docs) - Continuous profiling tool that analyzes CPU and memory usage in production.
- [Managed Service for Prometheus](https://cloud.google.com/managed-prometheus) - Fully managed, Prometheus-compatible monitoring for metrics at scale.
- [OpenTelemetry](https://opentelemetry.io) - Vendor-neutral framework for generating and collecting telemetry data.

## Data & AI

- [BigQuery](https://cloud.google.com/bigquery/docs) - Serverless, highly scalable data warehouse with built-in analytics.
- [bq command-line tool](https://cloud.google.com/bigquery/docs/bq-command-line-tool) - CLI for running queries and managing BigQuery resources.
- [Dataflow](https://cloud.google.com/dataflow/docs) - Managed service for executing Apache Beam batch and streaming pipelines.
- [Dataproc](https://cloud.google.com/dataproc/docs) - Managed Spark and Hadoop service for batch processing and machine learning.
- [Pub/Sub](https://cloud.google.com/pubsub/docs) - Global, scalable messaging service for event ingestion and delivery.
- [Vertex AI](https://cloud.google.com/vertex-ai/docs) - Unified platform for building, training, and deploying machine learning models.
- [Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/python-sdk/use-vertex-ai-python-sdk) - Python SDK for programmatically using Vertex AI services.
- [Looker Studio](https://cloud.google.com/looker-studio) - Free tool for building interactive dashboards and reports.
- [Datastream](https://cloud.google.com/datastream/docs) - Serverless change data capture and replication service.

## Cost & FinOps

- [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator) - Tool for estimating the cost of Google Cloud products and configurations.
- [Cloud Billing documentation](https://cloud.google.com/billing/docs) - Documentation for managing billing accounts, budgets, and cost controls.
- [Recommender](https://cloud.google.com/recommender/docs) - Service that surfaces recommendations to optimize cost, security, and performance.
- [Active Assist](https://cloud.google.com/solutions/active-assist) - Portfolio of tools that use data and ML to reduce cost and improve operations.
- [BigQuery Billing Export](https://cloud.google.com/billing/docs/how-to/export-data-bigquery) - Guide for exporting detailed Cloud Billing data to BigQuery for analysis.

## Architecture & Decision Tools

- [Google Cloud Architecture Center](https://cloud.google.com/architecture) - Reference architectures, best practices, and design guidance.
- [GCP Compute Selector](https://www.alekseialeinikov.com/en/tools/compute-selector) - Interactive tool that recommends Cloud Run vs GKE vs Cloud Functions vs Compute Engine for a workload.
- [GCP Database Selector](https://www.alekseialeinikov.com/en/tools/database-selector) - Interactive tool for choosing between Cloud SQL, AlloyDB, Spanner, Firestore, Bigtable, BigQuery, and Memorystore.
- [GCP IAM Policy Checker](https://www.alekseialeinikov.com/en/tools/iam-checker) - Pastes a GCP IAM policy and returns least-privilege findings such as public access and overly broad roles.
- [GCPing](https://gcping.com) - Web tool that measures your latency to every Google Cloud region.
- [GCP instances reference](https://gcpinstances.doit.com) - Searchable reference of Compute Engine machine types and pricing.

## Learning & Certification

- [Google Cloud Skills Boost](https://www.cloudskillsboost.google) - Official learning platform with hands-on labs and learning paths.
- [Google Cloud Documentation](https://cloud.google.com/docs) - Central hub for all Google Cloud product documentation.
- [Google Cloud Certifications](https://cloud.google.com/learn/certification) - Official page listing Google Cloud certification tracks and exam guides.
- [Coursera — Google Cloud](https://www.coursera.org/googlecloud) - Google Cloud courses and specializations hosted on Coursera.
- [awesome-gcp-certifications](https://github.com/sathishvj/awesome-gcp-certifications) - Community-curated study resources for every Google Cloud certification.

## Community & Reference

- [Google Cloud Community](https://www.googlecloudcommunity.com) - Official forums for asking questions and discussing Google Cloud products.
- [The Google Cloud Developer's Cheat Sheet](https://github.com/priyankavergadia/google-cloud-4-words) - Every Google Cloud product described in four words or fewer.
- [thecloudgirl.dev](https://thecloudgirl.dev) - Priyanka Vergadia's collection of visual sketchnotes explaining Google Cloud concepts.
- [Google Cloud — Medium](https://medium.com/google-cloud) - Community publication with articles from Google Cloud practitioners.
- [r/googlecloud](https://www.reddit.com/r/googlecloud/) - Subreddit for Google Cloud news, questions, and discussion.
- [GCPing (GitHub)](https://github.com/GoogleCloudPlatform/gcping) - Source repository for the GCPing latency-measurement tool.

## Blogs & Newsletters

- [Google Cloud Blog](https://cloud.google.com/blog) - Official source for Google Cloud news and technical content.
- [Google Cloud Tech (YouTube)](https://www.youtube.com/@googlecloudtech) - Official YouTube channel with technical tutorials and product deep dives.
- [GCP Weekly](https://www.gcpweekly.com) - Independent weekly newsletter aggregating Google Cloud news, articles, and tutorials.
- [Kubernetes Podcast from Google](https://kubernetespodcast.com) - Google-produced podcast on Kubernetes and the cloud-native ecosystem.

## Contributing

Contributions are welcome! Please read the [contribution guidelines](contributing.md) first. In short: one link per pull request, keep descriptions concise and neutral, and make sure the resource is genuinely useful and actively maintained.

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the contributors have waived all copyright and related or neighboring rights to this work.
