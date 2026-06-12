import React, { useState, useEffect } from 'react';
import { playClickSound } from './Header';
import { Server, Database, Cloud, Terminal, Play } from 'lucide-react';

type ComponentId = 'route53' | 'apigateway' | 'lambda' | 'rds' | 's3';

interface TerraformDefinition {
  hcl: string;
  description: string;
}

const terraformConfigs: Record<ComponentId, TerraformDefinition> = {
  route53: {
    hcl: `resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "api.manaspawar.com"
  type    = "A"

  alias {
    name                   = aws_apigatewayv2_domain_name.api.target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api.hosted_zone_id
    evaluate_target_health = false
  }
}`,
    description: "Configures global DNS routing rules using AWS Route53, creating aliases pointing securely to the API Gateway endpoint."
  },
  apigateway: {
    hcl: `resource "aws_apigatewayv2_api" "http_api" {
  name          = "serverless-pipeline-gateway"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["https://manaspawar.com"]
    allow_methods = ["POST", "GET"]
  }
}

resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "production"
  auto_deploy = true
}`,
    description: "HTTP API Gateway interface managing client traffic, rate limits, CORS compliance, and routing endpoints to compute modules."
  },
  lambda: {
    hcl: `resource "aws_lambda_function" "processor" {
  filename      = "dist/processor.zip"
  function_name = "pipeline-data-processor"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  environment {
    variables = {
      DB_HOST = aws_db_instance.postgres.address
      S3_BUCKET = aws_s3_bucket.data_lake.id
    }
  }
}`,
    description: "Serverless execution layer running nodejs environment, linked securely inside the VPC to write data to databases and read inputs."
  },
  rds: {
    hcl: `resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t4g.micro"
  db_name              = "datalake"
  username             = "admin_operator"
  password             = var.db_master_password
  db_subnet_group_name = aws_db_subnet_group.private.name
  vpc_security_group_ids = [aws_security_group.db_access.id]
  skip_final_snapshot  = true
}`,
    description: "Relational DB instance hosted on private subnet groups with tight security policies blocking ingress from external networks."
  },
  s3: {
    hcl: `resource "aws_s3_bucket" "data_lake" {
  bucket        = "manas-secure-datalake-bucket"
  force_destroy = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "enc" {
  bucket = aws_s3_bucket.data_lake.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}`,
    description: "S3 Object Store hosting persistent storage files, secured with server-side AES255 encryption, lifecycle policies, and locked public buckets."
  }
};

export const ArchitectureDiagram: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentId>('lambda');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleComponentClick = (id: ComponentId) => {
    playClickSound();
    setActiveComponent(id);
  };

  // Simulated pipeline execution
  const startDeployment = () => {
    if (isDeploying) return;
    playClickSound();
    setIsDeploying(true);
    setDeployLogs([]);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!isDeploying) return;

    const pipelineSteps = [
      "SYS.RUN: Initializing Terraform Deployment Pipeline...",
      "RUNNER: Cloning configuration repository...",
      "SHELL: $ terraform init",
      "OUTPUT: Initializing modules...",
      "OUTPUT: Initializing the backend (AWS S3 state)...",
      "OUTPUT: Initializing provider plugins...",
      "OUTPUT: HashiCorp AWS provider v5.24.0 successfully downloaded.",
      "OUTPUT: Terraform has been successfully initialized!",
      "SHELL: $ terraform plan -out=tfplan",
      "OUTPUT: Refreshing Terraform state in memory...",
      "OUTPUT: Terraform will perform the following actions:",
      `OUTPUT:   + aws_route53_record.api created`,
      `OUTPUT:   + aws_apigatewayv2_api.http_api created`,
      `OUTPUT:   + aws_lambda_function.processor created`,
      `OUTPUT:   + aws_db_instance.postgres created`,
      `OUTPUT:   + aws_s3_bucket.data_lake created`,
      "OUTPUT: Plan: 5 to add, 0 to change, 0 to destroy.",
      "SHELL: $ terraform apply -auto-approve tfplan",
      "OUTPUT: aws_s3_bucket.data_lake: Creating...",
      "OUTPUT: aws_s3_bucket.data_lake: Creation complete after 3s",
      "OUTPUT: aws_db_instance.postgres: Creating...",
      "OUTPUT: aws_lambda_function.processor: Creating...",
      "OUTPUT: aws_lambda_function.processor: Creation complete after 8s",
      "OUTPUT: aws_apigatewayv2_api.http_api: Creating...",
      "OUTPUT: aws_apigatewayv2_api.http_api: Creation complete after 4s",
      "OUTPUT: aws_route53_record.api: Creating...",
      "OUTPUT: aws_route53_record.api: Creation complete after 2s",
      "OUTPUT: aws_db_instance.postgres: Creation complete after 14s",
      "OUTPUT: Apply complete! Resources: 5 added, 0 changed, 0 destroyed.",
      "STATUS: DEPLOYMENT SUCCESSFUL. END OF STREAM."
    ];

    if (currentStep < pipelineSteps.length) {
      const timer = setTimeout(() => {
        setDeployLogs((prev) => [...prev, pipelineSteps[currentStep]]);
        setCurrentStep((prev) => prev + 1);
        
        // Autoscroll terminal
        const terminalEl = document.getElementById('pipeline-terminal');
        if (terminalEl) {
          terminalEl.scrollTop = terminalEl.scrollHeight;
        }
      }, Math.random() * 300 + 100);
      return () => clearTimeout(timer);
    } else {
      setIsDeploying(false);
    }
  }, [isDeploying, currentStep]);

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full items-stretch">
      {/* Column 1: Interactive SVG Architecture Canvas */}
      <div className="flex-1 bg-secondary/45 border border-accent-lime/20 rounded-lg p-5 flex flex-col justify-between theme-transition min-h-[450px]">
        <div>
          <h3 className="font-mono text-sm font-bold text-accent-lime tracking-widest uppercase border-b border-accent-lime/10 pb-2 flex items-center justify-between">
            <span>[Interactive AWS Blueprint]</span>
            <span className="text-[9px] text-text/40">CLICK NODES TO GENERATE HCL</span>
          </h3>
          
          {/* Legend */}
          <div className="flex justify-center gap-4 mt-3 font-mono text-[9px] text-text/40">
            <span className="flex items-center gap-1"><Cloud size={10} className="text-accent-orange" /> Route53/Gateway</span>
            <span className="flex items-center gap-1"><Server size={10} className="text-accent-lime" /> Lambda Compute</span>
            <span className="flex items-center gap-1"><Database size={10} className="text-accent-mint" /> Databases/S3</span>
          </div>
        </div>

        {/* Visual Map SVG */}
        <div className="my-6 flex-1 flex items-center justify-center bg-primary/25 rounded border border-text/5 p-4 relative min-h-[280px]">
          <svg viewBox="0 0 100 70" className="w-full max-w-[500px]">
            {/* Connection Paths */}
            <path d="M 15,35 L 35,35" stroke={activeComponent === 'route53' || activeComponent === 'apigateway' ? 'var(--accent-lime)' : 'var(--text-primary)'} strokeWidth="0.5" strokeDasharray="1,1" opacity="0.3" />
            <path d="M 35,35 L 55,35" stroke={activeComponent === 'apigateway' || activeComponent === 'lambda' ? 'var(--accent-lime)' : 'var(--text-primary)'} strokeWidth="0.5" strokeDasharray="1,1" opacity="0.3" />
            <path d="M 55,35 L 75,22" stroke={activeComponent === 'lambda' || activeComponent === 's3' ? 'var(--accent-lime)' : 'var(--text-primary)'} strokeWidth="0.5" strokeDasharray="1,1" opacity="0.3" />
            <path d="M 55,35 L 75,48" stroke={activeComponent === 'lambda' || activeComponent === 'rds' ? 'var(--accent-lime)' : 'var(--text-primary)'} strokeWidth="0.5" strokeDasharray="1,1" opacity="0.3" />

            {/* Component Nodes */}
            {/* 1. DNS Route53 Node */}
            <g className="cursor-pointer" onClick={() => handleComponentClick('route53')}>
              <rect x="5" y="25" width="20" height="20" rx="2" fill={activeComponent === 'route53' ? 'var(--accent-orange)' : 'var(--bg-secondary)'} stroke="var(--accent-orange)" strokeWidth="0.5" className="transition-all duration-300" opacity={activeComponent === 'route53' ? 0.9 : 0.7} />
              <text x="15" y="32" textAnchor="middle" fill="var(--text-primary)" fontSize="2.5" fontFamily="monospace" fontWeight="bold">ROUTE 53</text>
              <text x="15" y="38" textAnchor="middle" fill="var(--text-primary)" fontSize="1.8" fontFamily="monospace" opacity="0.6">Global DNS</text>
            </g>

            {/* 2. API Gateway Node */}
            <g className="cursor-pointer" onClick={() => handleComponentClick('apigateway')}>
              <rect x="30" y="25" width="18" height="20" rx="2" fill={activeComponent === 'apigateway' ? 'var(--accent-orange)' : 'var(--bg-secondary)'} stroke="var(--accent-orange)" strokeWidth="0.5" className="transition-all duration-300" opacity={activeComponent === 'apigateway' ? 0.9 : 0.7} />
              <text x="39" y="32" textAnchor="middle" fill="var(--text-primary)" fontSize="2.5" fontFamily="monospace" fontWeight="bold">API GATEWAY</text>
              <text x="39" y="38" textAnchor="middle" fill="var(--text-primary)" fontSize="1.8" fontFamily="monospace" opacity="0.6">HTTP Ingress</text>
            </g>

            {/* 3. AWS Lambda Processor Node */}
            <g className="cursor-pointer" onClick={() => handleComponentClick('lambda')}>
              <rect x="53" y="25" width="16" height="20" rx="2" fill={activeComponent === 'lambda' ? 'var(--accent-lime)' : 'var(--bg-secondary)'} stroke="var(--accent-lime)" strokeWidth="0.5" className="transition-all duration-300" opacity={activeComponent === 'lambda' ? 0.9 : 0.7} />
              <text x="61" y="32" textAnchor="middle" fill="var(--bg-primary)" fontSize="2.5" fontFamily="monospace" fontWeight="bold">LAMBDA</text>
              <text x="61" y="38" textAnchor="middle" fill="var(--bg-primary)" fontSize="1.8" fontFamily="monospace" opacity="0.8">Serverless JS</text>
            </g>

            {/* 4. S3 Storage Node */}
            <g className="cursor-pointer" onClick={() => handleComponentClick('s3')}>
              <rect x="74" y="10" width="18" height="20" rx="2" fill={activeComponent === 's3' ? 'var(--accent-mint)' : 'var(--bg-secondary)'} stroke="var(--accent-mint)" strokeWidth="0.5" className="transition-all duration-300" opacity={activeComponent === 's3' ? 0.9 : 0.7} />
              <text x="83" y="18" textAnchor="middle" fill="var(--text-primary)" fontSize="2.5" fontFamily="monospace" fontWeight="bold">S3 BUCKET</text>
              <text x="83" y="24" textAnchor="middle" fill="var(--text-primary)" fontSize="1.8" fontFamily="monospace" opacity="0.6">Object Store</text>
            </g>

            {/* 5. RDS DB Node */}
            <g className="cursor-pointer" onClick={() => handleComponentClick('rds')}>
              <rect x="74" y="40" width="18" height="20" rx="2" fill={activeComponent === 'rds' ? 'var(--accent-mint)' : 'var(--bg-secondary)'} stroke="var(--accent-mint)" strokeWidth="0.5" className="transition-all duration-300" opacity={activeComponent === 'rds' ? 0.9 : 0.7} />
              <text x="83" y="48" textAnchor="middle" fill="var(--text-primary)" fontSize="2.5" fontFamily="monospace" fontWeight="bold">RDS (PGSQL)</text>
              <text x="83" y="54" textAnchor="middle" fill="var(--text-primary)" fontSize="1.8" fontFamily="monospace" opacity="0.6">Database</text>
            </g>
          </svg>
        </div>

        {/* Console control header */}
        <div className="flex justify-between items-center border-t border-text/10 pt-3">
          <span className="font-mono text-[9px] text-text/40">VPC BLOCK: AWS_EU_CENTRAL_1</span>
          <button
            onClick={startDeployment}
            disabled={isDeploying}
            className={`font-mono text-[9px] px-3 py-1.5 rounded flex items-center gap-1.5 shadow-md ${
              isDeploying
                ? 'bg-text/10 border border-text/20 text-text/40 cursor-not-allowed'
                : 'bg-accent-lime text-bg-primary hover:bg-accent-lime/85 font-bold transition-all'
            }`}
          >
            <Play size={10} />
            <span>RUN_AWS_PIPELINE</span>
          </button>
        </div>
      </div>

      {/* Column 2: Code Terminal Console */}
      <div className="w-full xl:w-[480px] bg-secondary/45 border border-accent-lime/20 rounded-lg p-5 flex flex-col justify-between theme-transition min-h-[450px]">
        {/* Toggleable output area */}
        <div className="flex-1 flex flex-col min-h-[300px]">
          <div className="flex border-b border-text/10 pb-2 mb-3 items-center justify-between">
            <span className="font-mono text-xs text-accent-orange font-bold flex items-center gap-1.5">
              <Terminal size={13} /> TERMINAL STDOUT: {isDeploying ? 'RUNNING' : 'OUTPUT'}
            </span>
            <span className="font-mono text-[8px] text-text/30">MODULES_GENERATOR v2.4</span>
          </div>

          {deployLogs.length > 0 ? (
            /* Simulated code pipeline terminal logs output */
            <div
              id="pipeline-terminal"
              className="flex-1 bg-primary/60 border border-text/5 rounded p-3 font-mono text-[10px] overflow-y-auto leading-relaxed max-h-[310px]"
            >
              {deployLogs.map((log, idx) => {
                const isShell = log.startsWith("SHELL:");
                const isStatus = log.startsWith("STATUS:");
                return (
                  <div
                    key={idx}
                    className={`${
                      isShell
                        ? 'text-accent-orange'
                        : isStatus
                        ? 'text-accent-mint font-bold border-t border-accent-mint/10 pt-1 mt-1.5'
                        : 'text-text/75'
                    }`}
                  >
                    {isShell ? '> ' + log.replace("SHELL: $ ", "") : log.replace("OUTPUT: ", "").replace("STATUS: ", "")}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Terraform HCL Code Output */
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-accent-lime bg-accent-lime/10 border border-accent-lime/25 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                  {activeComponent.toUpperCase()}.TF
                </span>
                <pre className="mt-3 bg-primary/60 border border-text/5 rounded p-3 font-mono text-[10px] text-accent-lime/90 overflow-x-auto select-all">
                  {terraformConfigs[activeComponent].hcl}
                </pre>
              </div>
              <p className="font-mono text-[10px] text-text/60 leading-relaxed bg-primary/20 p-2.5 border border-text/5 rounded mt-3">
                <span className="font-bold text-text">Diagnostics:</span> {terraformConfigs[activeComponent].description}
              </p>
            </div>
          )}
        </div>

        {/* Footer info code */}
        <div className="border-t border-text/10 pt-3 mt-4 flex items-center justify-between font-mono text-[8px] text-text/30">
          <span>COMPILER: GOLANG_AST</span>
          <span>OUTPUT STATE: LOCAL_LOCK</span>
        </div>
      </div>
    </div>
  );
};
