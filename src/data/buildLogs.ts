export interface BuildLog {
  id: string;
  date: string;
  topic: string;
  learned: string;
  broke: string;
  fixed: string;
  next: string;
  tags: string[];
}

export const buildLogs: BuildLog[] = [
  {
    id: "LOG-104",
    date: "2026-06-10",
    topic: "Terraform State Locking & DynamoDB Glitches",
    learned: "DynamoDB state locks prevent concurrent executions, which is crucial when running automated pipelines in GitHub Actions. Learned how Terraform uses the LockID primary key value to coordinate.",
    broke: "Pipeline crashed due to an interrupted run, leaving the state locked in DynamoDB. Subsequent terraform plan executions were rejected with a 'State Lock Error'.",
    fixed: "Used `terraform force-unlock <LOCK_ID>` after validating that no other process was writing to state. Added an auto-unlock handler in the cleanup pipeline step to handle SIGTERM signals.",
    next: "Configure IAM policy boundaries to restrict force-unlock permissions solely to administrative operators.",
    tags: ["Terraform", "AWS", "DevOps"]
  },
  {
    id: "LOG-103",
    date: "2026-05-24",
    topic: "Multi-stage Docker Builds for Python Data Pipelines",
    learned: "Multi-stage builds allow compiling scientific dependencies (numpy/pandas) with complete build tools in the builder stage, then copying only the built wheel artifacts to a slim runtime image.",
    broke: "Container sizes bloated to 1.4GB due to gcc, python-dev, and build caches remaining in the final runtime layer.",
    fixed: "Implemented `python:3.11-slim` as the final runner target. Created wheel files in `/tmp/wheels` in the builder stage and installed them in the runner using `--no-cache-dir`.",
    next: "Implement Docker buildx layer caching backed by AWS Elastic Container Registry (ECR).",
    tags: ["Docker", "Python", "Data Science"]
  },
  {
    id: "LOG-102",
    date: "2026-04-15",
    topic: "IAM Policy Wildcards vs Least Privilege",
    learned: "AWS IAM policies with '*' resource scopes are risky. It is vital to use resource ARN restrictions and IAM Condition blocks to limit access to specific accounts and environments.",
    broke: "A pipeline script accidentally deleted a staging S3 bucket because the pipeline IAM role had broad `s3:*` actions allowed on all resources.",
    fixed: "Refactored the policy to strictly scope S3 actions. Allowed deletions only under a specific prefix and enforced `aws:PrincipalOrgID` and tag-based conditions (`Environment: Dev`).",
    next: "Write an automated tfsec/checkov pre-commit hook to catch IAM wildcard policies before check-in.",
    tags: ["AWS", "Security", "Automation"]
  },
  {
    id: "LOG-101",
    date: "2026-03-08",
    topic: "React Frame-rate Drops in SVG Canvas Animations",
    learned: "Updating state coordinates on every mouse move in React causes excessive re-renders, causing frame-rates to drop below 30FPS.",
    broke: "The interactive particle constellation dropped to 15FPS when drawing multiple hover link lines in the DOM.",
    fixed: "Moved the animation loop out of React state and into an HTML5 Canvas drawing context using `requestAnimationFrame`. React now only mounts the canvas element and delegates rendering to a draw loop.",
    next: "Optimize canvas rendering on retina displays by adjusting the devicePixelRatio scaling multiplier.",
    tags: ["React", "Performance", "Canvas"]
  }
];
