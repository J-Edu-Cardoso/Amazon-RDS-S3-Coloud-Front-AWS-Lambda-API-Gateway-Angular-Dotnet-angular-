import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aws-architecture',
  templateUrl: './aws-architecture.component.html',
  styleUrls: ['./aws-architecture.component.css']
})
export class AwsArchitectureComponent implements OnInit {
  animationRunning = false;
  autoMode = false;

  explanations: any = {
    'user': 'Este fluxo simula uma requisição feita pelo usuário ao frontend Angular. O pedido passa pela CDN (CloudFront) e chega ao armazenamento (Amazon S3), mostrando como o conteúdo estático é entregue rapidamente ao usuário.',
    'api': 'Aqui você vê o caminho de uma chamada de API. O frontend Angular aciona o API Gateway, que direciona a requisição para uma função Lambda (backend .NET), que por sua vez pode acessar o banco de dados Amazon RDS.',
    'data': 'Este fluxo mostra o ciclo completo dos dados: do usuário ao frontend, passando por toda a infraestrutura AWS até o banco de dados, demonstrando a integração dos serviços.',
    'reset': 'O reset limpa todas as animações e estados ativos, permitindo que você recomece a visualização dos fluxos.',
    'auto': 'A demonstração automática executa todos os fluxos em sequência, facilitando o entendimento do funcionamento geral da arquitetura.'
  };
  balloonText = '';
  balloonActive = false;

  ngOnInit(): void {}

  showBalloon(type: string) {
    this.balloonText = this.explanations[type] || '';
    this.balloonActive = true;
  }

  hideBalloon() {
    this.balloonActive = false;
  }

  activateComponent(componentName: string, duration = 1000) {
    const component = document.querySelector(`[data-component="${componentName}"]`);
    const statusDot = document.getElementById(`status-${componentName === 'api-gateway' ? 'api' : componentName}`);
    if (component) {
      component.classList.add('active');
      if (statusDot) statusDot.classList.add('active');
      setTimeout(() => {
        component.classList.remove('active');
        if (statusDot) statusDot.classList.remove('active');
      }, duration);
    }
  }

  activateConnection(connectionClass: string, duration = 1000) {
    const connections = document.querySelectorAll(`.${connectionClass}`);
    connections.forEach(conn => {
      conn.classList.add('active');
      setTimeout(() => {
        conn.classList.remove('active');
      }, duration);
    });
  }

  simulateUserRequest() {
    if (this.animationRunning) return;
    this.animationRunning = true;
    this.activateComponent('angular', 800);
    setTimeout(() => {
      this.activateConnection('conn-angular-cloudfront', 600);
    }, 200);
    setTimeout(() => {
      this.activateComponent('cloudfront', 800);
    }, 600);
    setTimeout(() => {
      this.activateConnection('conn-cloudfront-s3', 600);
    }, 800);
    setTimeout(() => {
      this.activateComponent('s3', 1000);
    }, 1200);
    setTimeout(() => {
      this.animationRunning = false;
    }, 2500);
  }

  simulateApiCall() {
    if (this.animationRunning) return;
    this.animationRunning = true;
    this.activateComponent('angular', 600);
    setTimeout(() => {
      this.activateConnection('conn-angular-api', 800);
    }, 200);
    setTimeout(() => {
      this.activateComponent('api-gateway', 800);
    }, 800);
    setTimeout(() => {
      this.activateConnection('conn-api-lambda', 600);
    }, 1000);
    setTimeout(() => {
      this.activateComponent('lambda', 1000);
    }, 1400);
    setTimeout(() => {
      this.activateConnection('conn-lambda-rds', 600);
    }, 1600);
    setTimeout(() => {
      this.activateComponent('rds', 1200);
    }, 2000);
    setTimeout(() => {
      this.animationRunning = false;
    }, 3500);
  }

  simulateDataFlow() {
    if (this.animationRunning) return;
    this.animationRunning = true;
    const sequence = [
      { component: 'angular', delay: 0, duration: 600 },
      { connection: 'conn-angular-cloudfront', delay: 200, duration: 500 },
      { component: 'cloudfront', delay: 500, duration: 600 },
      { connection: 'conn-cloudfront-s3', delay: 700, duration: 500 },
      { component: 's3', delay: 1000, duration: 600 },
      { connection: 'conn-angular-api', delay: 1200, duration: 800 },
      { component: 'api-gateway', delay: 1500, duration: 600 },
      { connection: 'conn-api-lambda', delay: 1700, duration: 500 },
      { component: 'lambda', delay: 2000, duration: 800 },
      { connection: 'conn-lambda-rds', delay: 2200, duration: 500 },
      { component: 'rds', delay: 2500, duration: 1000 }
    ];
    sequence.forEach(item => {
      setTimeout(() => {
        if ((item as any).component) {
          this.activateComponent((item as any).component, (item as any).duration);
        } else if ((item as any).connection) {
          this.activateConnection((item as any).connection, (item as any).duration);
        }
      }, (item as any).delay);
    });
    setTimeout(() => {
      this.animationRunning = false;
    }, 4000);
  }

  resetAnimation() {
    this.animationRunning = false;
    this.autoMode = false;
    document.querySelectorAll('.component').forEach(comp => {
      comp.classList.remove('active');
    });
    document.querySelectorAll('.connection').forEach(conn => {
      conn.classList.remove('active');
    });
    document.querySelectorAll('.status-dot').forEach(dot => {
      dot.classList.remove('active');
    });
    document.querySelectorAll('.btn').forEach(btn => {
      btn.classList.remove('active');
    });
  }

  autoDemo() {
    if (this.autoMode) {
      this.autoMode = false;
      this.resetAnimation();
      return;
    }
    this.autoMode = true;
    setTimeout(() => {
      if (!this.autoMode) return;
      this.simulateUserRequest();
      setTimeout(() => {
        if (!this.autoMode) return;
        this.simulateApiCall();
      }, 3000);
      setTimeout(() => {
        if (!this.autoMode) return;
        this.simulateDataFlow();
      }, 7000);
      setTimeout(() => {
        if (this.autoMode) this.autoDemo();
      }, 12000);
    });
  }
}
